import { Injectable, NotFoundException } from '@nestjs/common'
import { EstateType } from '@prisma/client'
import { levenshtein } from 'src/utils/levenshtein'
import { PrismaService } from '../prisma.service'
import { EstateSearchDto, GeoPoint } from './dto/estate-search.dto'
import { EstateDto } from './dto/estate.dto'

@Injectable()
export class EstateService {
	constructor(private readonly prisma: PrismaService) {}

	async createEstate(data: EstateDto) {
		const { floor, rooms, totalArea, floors, ...estateData } = data

		const type = data.type.toUpperCase() as EstateType

		return this.prisma.estate.create({
			data: {
				...estateData,
				type,
				...(type === EstateType.APARTMENT && {
					apartmentData: {
						create: {
							floor: floor ? Number(floor) : null,
							rooms: rooms ? Number(rooms) : null,
							totalArea: totalArea ? Number(totalArea) : null,
						},
					},
				}),
				...(type === EstateType.HOUSE && {
					houseData: {
						create: {
							floors: floors ? Number(floors) : null,
							rooms: rooms ? Number(rooms) : null,
							totalArea: totalArea ? Number(totalArea) : null,
						},
					},
				}),
				...(type === EstateType.LAND && {
					landData: {
						create: {
							totalArea: totalArea ? Number(totalArea) : null,
						},
					},
				}),
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})
	}

	async updateEstate(id: string, data: EstateDto) {
		const { floor, rooms, totalArea, floors, ...estateData } = data

		const estate = await this.prisma.estate.findUnique({
			where: { id },
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})

		if (!estate) throw new NotFoundException('Estate not found')

		return this.prisma.estate.update({
			where: { id },
			data: {
				...estateData,
				type: estate.type,
				...(estate.type === EstateType.APARTMENT && {
					apartmentData: {
						upsert: {
							create: {
								floor: floor ? Number(floor) : null,
								rooms: rooms ? Number(rooms) : null,
								totalArea: totalArea ? Number(totalArea) : null,
							},
							update: {
								floor: floor ? Number(floor) : null,
								rooms: rooms ? Number(rooms) : null,
								totalArea: totalArea ? Number(totalArea) : null,
							},
						},
					},
				}),
				...(estate.type === EstateType.HOUSE && {
					houseData: {
						upsert: {
							create: {
								floors: floors ? Number(floors) : null,
								rooms: rooms ? Number(rooms) : null,
								totalArea: totalArea ? Number(totalArea) : null,
							},
							update: {
								floors: floors ? Number(floors) : null,
								rooms: rooms ? Number(rooms) : null,
								totalArea: totalArea ? Number(totalArea) : null,
							},
						},
					},
				}),
				...(estate.type === EstateType.LAND && {
					landData: {
						upsert: {
							create: {
								totalArea: totalArea ? Number(totalArea) : null,
							},
							update: {
								totalArea: totalArea ? Number(totalArea) : null,
							},
						},
					},
				}),
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})
	}

	async deleteEstate(id: string) {
		const estate = await this.prisma.estate.findUnique({
			where: { id },
			include: { offers: true },
		})

		if (!estate) {
			throw new Error('Объект недвижимости не найден')
		}

		if (estate.offers.length > 0) {
			throw new Error(
				'Нельзя удалить объект недвижимоси, связанный с предложением'
			)
		}

		return this.prisma.estate.delete({
			where: { id },
		})
	}

	async getEstates(filter: Partial<EstateDto>) {
		return this.prisma.estate.findMany({
			where: {
				...filter,
				...(filter.type && {
					type: filter.type.toUpperCase() as EstateType
				})
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})
	}

	async searchEstates(searchParams: EstateSearchDto) {
		const estates = await this.prisma.estate.findMany({
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})

		return estates.filter((estate) => {
			// Проверка на сответствие адреса
			if (
				searchParams.city ||
				searchParams.street ||
				searchParams.house ||
				searchParams.apartment
			) {
				const cityMatch =
					!searchParams.city ||
					levenshtein(
						estate.city?.toLowerCase() || '',
						searchParams.city.toLowerCase()
					) <= 3
				const streetMatch =
					!searchParams.street ||
					levenshtein(
						estate.street?.toLowerCase() || '',
						searchParams.street.toLowerCase()
					) <= 3
				const houseMatch =
					!searchParams.house ||
					levenshtein(
						estate.house?.toLowerCase() || '',
						searchParams.house.toLowerCase()
					) <= 1
				const apartmentMatch =
					!searchParams.apartment ||
					levenshtein(
						estate.apartment?.toLowerCase() || '',
						searchParams.apartment.toLowerCase()
					) <= 1

				if (!cityMatch || !streetMatch || !houseMatch || !apartmentMatch) {
					return false
				}
			}

			// Проверка на нахождение внутри полигона
			if (searchParams.polygon && estate.latitude && estate.longitude) {
				return this.isPointInPolygon(
					{ latitude: estate.latitude, longitude: estate.longitude },
					searchParams.polygon
				)
			}

			return true
		})
	}

	private isPointInPolygon(point: GeoPoint, polygon: GeoPoint[]): boolean {
		if (polygon.length < 3) return false

		let inside = false
		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			const xi = polygon[i].longitude
			const yi = polygon[i].latitude
			const xj = polygon[j].longitude
			const yj = polygon[j].latitude

			const intersect =
				yi > point.latitude !== yj > point.latitude &&
				point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi

			if (intersect) inside = !inside
		}

		return inside
	}

	async getById(id: string) {
		const estate = await this.prisma.estate.findUnique({
			where: { id },
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})

		if (!estate) {
			throw new NotFoundException('Объект недвижимости не найден')
		}

		return estate
	}
}
