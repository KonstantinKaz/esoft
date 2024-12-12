import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { EventDto } from './dto/event.dto'

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(realtorId: string, data: EventDto) {
    const { duration, ...rest } = data
    
    return this.prisma.event.create({
      data: {
        ...rest,
        duration: duration ? parseInt(duration.toString()) : null,
        realtor: {
          connect: { id: realtorId }
        }
      }
    })
  }

  async update(id: string, data: EventDto) {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) throw new NotFoundException('Событие не найдено')

    const { duration, ...rest } = data
    
    return this.prisma.event.update({
      where: { id },
      data: {
        ...rest,
        duration: duration ? parseInt(duration.toString()) : null
      }
    })
  }

  async delete(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) throw new NotFoundException('Событие не найдено')

    return this.prisma.event.delete({ where: { id } })
  }

  async getTodayEvents(realtorId: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return this.prisma.event.findMany({
      where: {
        realtorId,
        dateTime: {
          gte: today,
          lt: tomorrow
        }
      },
      orderBy: {
        dateTime: 'asc'
      }
    })
  }

  async getAll(realtorId: string) {
    return this.prisma.event.findMany({
      where: { realtorId },
      orderBy: {
        dateTime: 'desc'
      }
    })
  }

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) throw new NotFoundException('Событие не найдено')
    return event
  }
} 