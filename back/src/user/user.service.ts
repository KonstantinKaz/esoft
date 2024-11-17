import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

type UserRole = 'ADMIN' | 'REALTOR' | 'CLIENT'

type CreateUserDto = {
	password: string
	role: UserRole
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
	commission?: number
}

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(data: CreateUserDto) {
		const { role, ...profileData } = data

		if (role === 'REALTOR') {
			if (
				!profileData.firstName ||
				!profileData.lastName ||
				!profileData.email ||
				!profileData.phone
			) {
				throw new Error('Все поля обязательны для риэлтора')
			}
		}

		if (role !== 'ADMIN' && !profileData.email && !profileData.phone) {
			throw new Error('Необходимо указать email или телефон')
		}

		return this.prisma.user.create({
			data: {
				password: data.password,
				role,
				...(role === 'CLIENT' && {
					clientProfile: {
						create: {
							firstName: profileData.firstName,
							lastName: profileData.lastName,
							email: profileData.email,
							phone: profileData.phone,
						},
					},
				}),
				...(role === 'REALTOR' && {
					realtorProfile: {
						create: {
							firstName: profileData.firstName!,
							lastName: profileData.lastName!,
							email: profileData.email!,
							phone: profileData.phone!,
							commission: profileData.commission || 0,
						},
					},
				}),
			},
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})
	}
}
