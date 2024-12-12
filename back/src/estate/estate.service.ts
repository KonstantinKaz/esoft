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
		const { apartmentData, houseData, landData, ...estateData } = data

		return this.prisma.estate.create({
			data: {
				...estateData,
				type: data.type,
				houseData: data.type === 'HOUSE' ? {
					create: {
						floors: houseData?.floors ? parseInt(houseData.floors) : null,
						rooms: houseData?.rooms ? parseInt(houseData.rooms) : null,
						totalArea: houseData?.totalArea ? parseFloat(houseData.totalArea) : null
					}
				} : undefined,
				apartmentData: data.type === 'APARTMENT' ? {
					create: {
						apartment: apartmentData?.apartment || null,
						floor: apartmentData?.floor ? parseInt(apartmentData.floor) : null,
						rooms: apartmentData?.rooms ? parseInt(apartmentData.rooms) : null,
						totalArea: apartmentData?.totalArea ? parseFloat(apartmentData.totalArea) : null
					}
				} : undefined,
				landData: data.type === 'LAND' ? {
					create: {
						totalArea: landData?.totalArea ? parseFloat(landData.totalArea) : null,
						coordinates: landData?.coordinates || null
					}
				} : undefined
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true
			}
		})
	}

	async updateEstate(id: string, data: EstateDto) {
		const { apartmentData, houseData, landData, ...estateData } = data

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
								apartment: apartmentData?.apartment || null,
								floor: apartmentData?.floor ? Number(apartmentData.floor) : null,
								rooms: apartmentData?.rooms ? Number(apartmentData.rooms) : null,
								totalArea: apartmentData?.totalArea ? Number(apartmentData.totalArea) : null,
							},
							update: {
								apartment: apartmentData?.apartment || null,
								floor: apartmentData?.floor ? Number(apartmentData.floor) : null,
								rooms: apartmentData?.rooms ? Number(apartmentData.rooms) : null,
								totalArea: apartmentData?.totalArea ? Number(apartmentData.totalArea) : null,
							}
						}
					}
				}),
				...(estate.type === EstateType.HOUSE && {
					houseData: {
						upsert: {
							create: {
								floors: houseData?.floors ? Number(houseData.floors) : null,
								rooms: houseData?.rooms ? Number(houseData.rooms) : null,
								totalArea: houseData?.totalArea ? Number(houseData.totalArea) : null,
							},
							update: {
								floors: houseData?.floors ? Number(houseData.floors) : null,
								rooms: houseData?.rooms ? Number(houseData.rooms) : null,
								totalArea: houseData?.totalArea ? Number(houseData.totalArea) : null,
							}
						}
					}
				}),
				...(estate.type === EstateType.LAND && {
					landData: {
						upsert: {
							create: {
								totalArea: landData?.totalArea ? Number(landData.totalArea) : null,
								coordinates: landData?.coordinates ? JSON.stringify(landData.coordinates) : null
							},
							update: {
								totalArea: landData?.totalArea ? Number(landData.totalArea) : null,
								coordinates: landData?.coordinates ? JSON.stringify(landData.coordinates) : null
							}
						}
					}
				})
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true
			}
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
		const { apartmentData, houseData, landData, searchTerm, ...restFilter } = filter
		
		return this.prisma.estate.findMany({
			where: {
				...restFilter,
				OR: searchTerm ? [
					{
						city: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						street: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						house: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				] : undefined
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true
			}
		})
	}

	async searchEstates(searchParams: EstateSearchDto) {
		const estates = await this.prisma.estate.findMany({
			where: {
				...(searchParams.city && {
					city: { contains: searchParams.city, mode: 'insensitive' }
				}),
				...(searchParams.street && {
					street: { contains: searchParams.street, mode: 'insensitive' }
				}),
				...(searchParams.house && {
					house: { contains: searchParams.house, mode: 'insensitive' }
				}),
				...(searchParams.apartment && {
					apartmentData: {
						apartment: { contains: searchParams.apartment, mode: 'insensitive' }
					}
				})
			},
			include: {
				apartmentData: true,
				houseData: true,
				landData: true,
			},
		})

		return estates
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
