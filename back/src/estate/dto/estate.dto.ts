import { EstateType } from '@prisma/client'
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EstateDto {
	id?: string
	type: EstateType
	city?: string
	street?: string
	house?: string
	searchTerm?: string

	// Данные для квартиры
	apartmentData?: {
		apartment?: string
		floor?: number
		rooms?: number
		totalArea?: number
	}

	// Данные для дома
	houseData?: {
		floors?: number
		rooms?: number
		totalArea?: number
	}

	// Данные для участка
	landData?: {
		totalArea?: number
		coordinates?: {
			latitude: number
			longitude: number
		}
	}
}
