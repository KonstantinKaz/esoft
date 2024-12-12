import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator'
import { Transform } from 'class-transformer'

export enum EstateType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  LAND = 'LAND'
}

export class DemandDto {
  @IsString()
  @IsNotEmpty()
  clientId: string

  @IsString()
  @IsNotEmpty()
  realtorId: string

  @IsEnum(EstateType)
  @IsNotEmpty()
  estateType: EstateType

  @IsString()
  @IsOptional()
  address?: string

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  minPrice?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  maxPrice?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  minArea?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  maxArea?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  minRooms?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  maxRooms?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  minFloor?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  maxFloor?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  minFloors?: number

  @Transform(({ value }) => typeof value === 'string' ? parseInt(value, 10) : value)
  @IsNumber()
  @IsOptional()
  maxFloors?: number
} 