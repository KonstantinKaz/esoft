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
	type: string
	city?: string
	street?: string
	house?: string
	apartment?: string
	latitude?: number
	longitude?: number

	// Поля для квартиры
	floor?: number
	rooms?: number
	totalArea?: number

	// Дополнительные поля для дома
	floors?: number
}
