import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { OfferDto } from './dto/offer.dto'

@Injectable()
export class OfferService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: OfferDto) {
    const { clientId, realtorId, estateId, price } = data

    // Проверяем существование клиента и его роль
    const client = await this.prisma.user.findUnique({
      where: { id: clientId },
      include: { clientProfile: true }
    })
    if (!client || !client.clientProfile) {
      throw new BadRequestException('Клиент не найден')
    }

    // Проверяем существование риэлтора и его роль
    const realtor = await this.prisma.user.findUnique({
      where: { id: realtorId },
      include: { realtorProfile: true }
    })
    if (!realtor || !realtor.realtorProfile) {
      throw new BadRequestException('Риэлтор не найден')
    }

    // Проверяем существование объекта недвижимости
    const estate = await this.prisma.estate.findUnique({
      where: { id: estateId }
    })
    if (!estate) {
      throw new BadRequestException('Объект недвижимости не найден')
    }

    // Преобразуем цену в число
    const numericPrice = typeof price === 'string' ? parseInt(price.replace(/\s/g, '')) : price

    return this.prisma.offer.create({
      data: {
        price: numericPrice,
        estateId,
        clientId,
        realtorId
      },
      include: {
        estate: true,
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

  async update(id: string, data: OfferDto) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: { deals: true }
    })

    if (!offer) {
      throw new NotFoundException('Предложение не найдено')
    }

    if (offer.deals.length > 0) {
      throw new BadRequestException('Нельзя изменить предложение, участвующее в сделке')
    }

    // Преобразуем цену в число так же, как и при создании
    const numericPrice = typeof data.price === 'string' 
      ? parseInt(data.price.replace(/\s/g, '')) 
      : data.price

    return this.prisma.offer.update({
      where: { id },
      data: {
        price: numericPrice,
        estateId: data.estateId,
        clientId: data.clientId,
        realtorId: data.realtorId
      },
      include: {
        estate: true,
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
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: { deals: true }
    })

    if (!offer) {
      throw new NotFoundException('Предложение не найдено')
    }

    if (offer.deals.length > 0) {
      throw new BadRequestException('Нельзя удалить предложение, участвующее в сделке')
    }

    return this.prisma.offer.delete({
      where: { id }
    })
  }

  async getAll() {
    return this.prisma.offer.findMany({
      include: {
        estate: true,
        client: {
          include: { clientProfile: true }
        },
        realtor: {
          include: { realtorProfile: true }
        }
      }
    })
  }

  async getById(id: string) {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
      include: {
        estate: true,
        client: {
          include: { clientProfile: true }
        },
        realtor: {
          include: { realtorProfile: true }
        }
      }
    })

    if (!offer) {
      throw new NotFoundException('Предложение не найдено')
    }

    return offer
  }
}
