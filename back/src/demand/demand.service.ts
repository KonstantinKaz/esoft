import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DemandDto } from './dto/demand.dto'

@Injectable()
export class DemandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: DemandDto) {
    try {
      console.log('Received create demand data:', data)
      
      const { clientId, realtorId, estateType, ...demandData } = data

      if (!estateType) {
        throw new BadRequestException('Тип недвижимости обязателен')
      }

      // Преобразуем числовые значения и удаляем лишние поля
      const numericData = this.convertToNumeric(demandData)
      console.log('After numeric conversion:', numericData)
      
      const { clientId: _, realtorId: __, ...cleanData } = numericData
      console.log('Final data for creation:', {
        ...cleanData,
        estateType,
        clientId,
        realtorId
      })

      return this.prisma.demand.create({
        data: {
          ...cleanData,
          estateType,
          client: {
            connect: { id: clientId }
          },
          realtor: {
            connect: { id: realtorId }
          }
        },
        include: {
          client: {
            include: {
              clientProfile: true
            }
          },
          realtor: {
            include: {
              realtorProfile: true
            }
          }
        }
      })
    } catch (error) {
      console.error('Error creating demand:', error)
      throw error
    }
  }

  async update(id: string, data: DemandDto) {
    const demand = await this.prisma.demand.findUnique({
      where: { id }
    })

    if (!demand) {
      throw new NotFoundException('Потребность не найдена')
    }

    const { clientId, realtorId, estateType, ...demandData } = data

    if (!estateType) {
      throw new BadRequestException('Тип недвижимости обязателен')
    }

    const numericData = this.convertToNumeric(demandData)
    const { clientId: _, realtorId: __, ...cleanData } = numericData

    return this.prisma.demand.update({
      where: { id },
      data: {
        ...cleanData,
        estateType,
        client: {
          connect: { id: clientId }
        },
        realtor: {
          connect: { id: realtorId }
        }
      },
      include: {
        client: {
          include: {
            clientProfile: true
          }
        },
        realtor: {
          include: {
            realtorProfile: true
          }
        }
      }
    })
  }

  async delete(id: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id }
    })

    if (!demand) {
      throw new NotFoundException('Потребность не ��айдена')
    }

    return this.prisma.demand.delete({
      where: { id }
    })
  }

  async getAll() {
    return this.prisma.demand.findMany({
      include: {
        client: {
          include: {
            clientProfile: true
          }
        },
        realtor: {
          include: {
            realtorProfile: true
          }
        }
      }
    })
  }

  async getById(id: string) {
    const demand = await this.prisma.demand.findUnique({
      where: { id },
      include: {
        client: {
          include: {
            clientProfile: true
          }
        },
        realtor: {
          include: {
            realtorProfile: true
          }
        }
      }
    })

    if (!demand) {
      throw new NotFoundException('Потребность не найдена')
    }

    return demand
  }

  private convertToNumeric(data: Partial<DemandDto>) {
    console.log('Converting to numeric, input:', data)
    
    const numericFields = [
      'minPrice',
      'maxPrice',
      'minArea',
      'maxArea',
      'minRooms',
      'maxRooms',
      'minFloor',
      'maxFloor',
      'minFloors',
      'maxFloors'
    ]

    const result = { ...data }

    for (const field of numericFields) {
      if (result[field] !== undefined && result[field] !== '') {
        result[field] = Number(result[field])
        console.log(`Converted ${field}:`, result[field])
      } else {
        delete result[field]
        console.log(`Deleted empty field: ${field}`)
      }
    }

    console.log('Conversion result:', result)
    return result
  }
}
