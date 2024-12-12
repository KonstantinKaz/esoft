import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString, IsDate } from 'class-validator'
import { Transform } from 'class-transformer'

export enum EventType {
  CLIENT_MEETING = 'CLIENT_MEETING',
  SHOWING = 'SHOWING',
  SCHEDULED_CALL = 'SCHEDULED_CALL'
}

export class EventDto {
  @Transform(({ value }) => value ? new Date(value) : new Date())
  @IsDate()
  dateTime: Date

  @Transform(({ value }) => value ? parseInt(value) : null)
  @IsNumber()
  @IsOptional()
  duration?: number

  @IsEnum(EventType)
  @IsNotEmpty()
  type: EventType

  @IsString()
  @IsOptional()
  comment?: string
} 