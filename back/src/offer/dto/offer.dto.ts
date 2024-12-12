import { IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class OfferDto {
  @IsString()
  @IsNotEmpty()
  clientId: string

  @IsString()
  @IsNotEmpty()
  realtorId: string

  @IsString()
  @IsNotEmpty()
  estateId: string

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parseInt(value.replace(/\s/g, ''))
    }
    return value
  })
  @IsNotEmpty()
  price: number | string
}