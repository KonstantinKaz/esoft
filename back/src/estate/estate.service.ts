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
							floor,
							rooms,
							totalArea,
						},
					},
				}),
				...(type === EstateType.HOUSE && {
					houseData: {
						create: {
							floors,
							rooms,
							totalArea,
						},
					},
				}),
				...(type === EstateType.LAND && {
					landData: {
						create: {
							totalArea,
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

	async updateEstate(id: string, data: Partial<EstateDto>) {
		const estate = await this.prisma.estate.findUnique({
			where: { id },
			include: {
				offers: true,
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})

		if (!estate) {
			throw new Error('Объект недвижимости не найден')
		}

		if (estate.offers.length > 0) {
			throw new Error(
				'Нельзя обновить объект недвижимости, связанный с предложением'
			)
		}

		const { floor, rooms, totalArea, floors, ...estateData } = data

		return this.prisma.estate.update({
			where: { id },
			data: {
				...estateData,
				...(estate.type === EstateType.APARTMENT && {
					apartmentData: {
						upsert: {
							create: {
								floor,
								rooms,
								totalArea,
							},
							update: {
								...(floor !== undefined && { floor }),
								...(rooms !== undefined && { rooms }),
								...(totalArea !== undefined && { totalArea }),
							},
						},
					},
				}),
				...(estate.type === EstateType.HOUSE && {
					houseData: {
						upsert: {
							create: {
								floors,
								rooms,
								totalArea,
							},
							update: {
								...(floors !== undefined && { floors }),
								...(rooms !== undefined && { rooms }),
								...(totalArea !== undefined && { totalArea }),
							},
						},
					},
				}),
				...(estate.type === EstateType.LAND && {
					landData: {
						upsert: {
							create: {
								totalArea,
							},
							update: {
								...(totalArea !== undefined && { totalArea }),
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
				'Нельзя удалить объект недвижимости, связанный с предложением'
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
				type: filter.type,
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
			// Проверка на соответствие адреса
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
