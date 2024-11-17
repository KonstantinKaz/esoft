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
	@Transform(({ value }) => value?.toUpperCase())
	type: EstateType

	@IsOptional()
	@IsString()
	city?: string

	@IsOptional()
	@IsString()
	street?: string

	@IsOptional()
	@IsString()
	house?: string

	@IsOptional()
	@IsString()
	apartment?: string

	@IsOptional()
	@IsNumber()
	@Min(-90)
	@Max(90)
	latitude?: number

	@IsOptional()
	@IsNumber()
	@Min(-180)
	@Max(180)
	longitude?: number

	@IsOptional()
	@IsNumber()
	floor?: number

	@IsOptional()
	@IsNumber()
	rooms?: number

	@IsOptional()
	@IsNumber()
	totalArea?: number

	@IsOptional()
	@IsNumber()
	floors?: number
}
