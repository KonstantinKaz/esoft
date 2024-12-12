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
	@IsEnum(EstateType)
	type: EstateType
	city: string
	street: string
	house: string
	searchTerm?: string

	// Данные для квартиры
	apartmentData?: {
		apartment: string
		floor: string
		rooms: string
		totalArea: string
	}

	// Данные для дома
	houseData?: {
		floors: string
		rooms: string
		totalArea: string
	}

	// Данные для участка
	landData?: {
		totalArea: string
		coordinates?: string
	}
}
