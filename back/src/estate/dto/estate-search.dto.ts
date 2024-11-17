import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class GeoPoint {
  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number
}

export class EstateSearchDto {
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
  @ValidateNested({ each: true })
  @Type(() => GeoPoint)
  polygon?: GeoPoint[]
} 