import { Injectable } from '@nestjs/common'

import { Role } from '@prisma/client'
import { hash } from 'argon2'
import { AuthClientDto } from 'src/auth/dto/clientAuth.dto'
import { PrismaService } from '../prisma.service'
import { levenshtein } from '../utils/levenshtein'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(
		data: AuthClientDto & { UserRole: Role; commission?: number }
	) {
		const { UserRole, password, ...profileData } = data

		if (!password) {
			throw new Error('Password is required')
		}

		const hashedPassword = await hash(password)

		if (UserRole === Role.REALTOR) {
			const { commission = 0, ...realtorProfileData } = profileData
			if (
				!realtorProfileData.firstName ||
				!realtorProfileData.lastName ||
				!realtorProfileData.email ||
				!realtorProfileData.phone
			) {
				throw new Error('Все поля обязательны для риэлтора')
			}
		}

		if (UserRole !== Role.ADMIN && !profileData.email && !profileData.phone) {
			throw new Error('Необ��одимо указать email или телефон')
		}

		return this.prisma.user.create({
			data: {
				password: hashedPassword,
				role: UserRole,
				...(UserRole === Role.CLIENT && {
					clientProfile: {
						create: {
							firstName: profileData.firstName,
							lastName: profileData.lastName,
							middleName: profileData.middleName,
							email: profileData.email,
							phone: profileData.phone,
						},
					},
				}),
				...(UserRole === Role.REALTOR && {
					realtorProfile: {
						create: {
							firstName: profileData.firstName!,
							lastName: profileData.lastName!,
							middleName: profileData.middleName!,
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

	async getAll(role?: string) {
		const where = role ? { role: role as Role } : {};
		
		return this.prisma.user.findMany({
			where,
			include: {
				clientProfile: true,
				realtorProfile: true
			}
		});
	}

	async updateUser(id: string, data: AuthClientDto & { commission?: number }) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})

		if (!user) {
			throw new Error('Пользователь не найден')
		}

		if (user.role === Role.CLIENT) {
			if (!data.email && !data.phone) {
				throw new Error('Необходимо указать email или телефон')
			}

			return this.prisma.clientProfile.update({
				where: { userId: id },
				data: {
					firstName: data.firstName || undefined,
					lastName: data.lastName || undefined,
					middleName: data.middleName || undefined,
					email: data.email || undefined,
					phone: data.phone || undefined,
				},
			})
		} else if (user.role === Role.REALTOR) {
			if (
				!data.firstName ||
				!data.lastName ||
				!data.email ||
				!data.phone
			) {
				throw new Error('Все поля обязательны для риэлтора')
			}

			return this.prisma.realtorProfile.update({
				where: { userId: id },
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					middleName: data.middleName,
					email: data.email,
					phone: data.phone,
					commission: data.commission,
				},
			})
		}

		throw new Error('Невозможно обновить пользователя с данной ролью')
	}

	async deleteUser(id: string) {
		// Находим пользователя и его профиль
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				clientProfile: true,
				realtorProfile: true
			}
		})

		if (!user) {
			throw new Error('Пользователь не найден')
		}

		// Используем транзакцию для атомарного удаления
		return this.prisma.$transaction(async (prisma) => {
			// Удаляем профиль в зависимости от роли
			if (user.role === Role.CLIENT) {
				await prisma.clientProfile.delete({
					where: { userId: id }
				})
			} else if (user.role === Role.REALTOR) {
				await prisma.realtorProfile.delete({
					where: { userId: id }
				})
			}

			// Уда��яем самого пользователя
			return prisma.user.delete({
				where: { id }
			})
		})
	}

	async getProfile(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})
	}

	async getEmail(email: string) {
		return this.prisma.user.findFirst({
			where: {
				OR: [
					{ clientProfile: { email: email } },
					{ realtorProfile: { email: email } },
				],
			},
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})
		// if (!user) {
		// 	throw new Error('Пользователь не найден')
		// }
		// return user
	}

	async fuzzySearch(searchQuery: {
		firstName?: string
		lastName?: string
		middleName?: string
	}) {
		const users = await this.prisma.user.findMany({
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		})

		return users.filter((user) => {
			const profile = user.clientProfile || user.realtorProfile
			if (!profile) return false

			const isMatchingName = (searchField?: string, profileField?: string) => {
				if (!searchField) return true
				if (!profileField) return false

				const distance = levenshtein(
					searchField.toLowerCase(),
					profileField.toLowerCase()
				)

				console.log(
					`Comparing "${searchField}" with "${profileField}": distance = ${distance}`
				)

				return distance <= 3
			}

			const firstNameMatch = isMatchingName(
				searchQuery.firstName,
				profile.firstName
			)
			const lastNameMatch = isMatchingName(
				searchQuery.lastName,
				profile.lastName
			)
			const middleNameMatch = isMatchingName(
				searchQuery.middleName,
				profile.middleName
			)

			const hasMatch =
				(searchQuery.firstName ? firstNameMatch : true) &&
				(searchQuery.lastName ? lastNameMatch : true) &&
				(searchQuery.middleName ? middleNameMatch : true)

			if (hasMatch) {
				console.log('Found matching profile:', profile)
			}

			return hasMatch
		})
	}
}
