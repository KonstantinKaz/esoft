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
		const { UserRole, ...profileData } = data
		const hashedPassword = await hash(data.password)

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
			throw new Error('Необходимо указать email или телефон')
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

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				role: true,
				password: false,
			},
		})
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
			return this.prisma.clientProfile.update({
				where: { userId: id },
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					middleName: data.middleName,
					email: data.email,
					phone: data.phone,
					// добавьте другие поля, которые вы хотите обновить
				},
			})
		} else if (user.role === Role.REALTOR) {
			return this.prisma.realtorProfile.update({
				where: { userId: id },
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					middleName: data.middleName,
					email: data.email,
					phone: data.phone,
					commission: data.commission,
					// добавьте другие поля, которые вы хотите обновить
				},
			})
		}

		throw new Error('Невозможно обновить пользователя с данной ролью')
	}

	async deleteUser(id: string) {
		await this.prisma.clientProfile.deleteMany({
			where: { userId: id },
		})

		return this.prisma.user.delete({
			where: { id },
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
		firstName?: string;
		lastName?: string;
		middleName?: string;
	}) {
		const users = await this.prisma.user.findMany({
			include: {
				clientProfile: true,
				realtorProfile: true,
			},
		});

		return users.filter(user => {
			const profile = user.clientProfile || user.realtorProfile;
			if (!profile) return false;

			const isMatchingName = (searchField?: string, profileField?: string) => {
				if (!searchField) return true;
				if (!profileField) return false;

				const distance = levenshtein(
					searchField.toLowerCase(),
					profileField.toLowerCase()
				);
				
				console.log(`Comparing "${searchField}" with "${profileField}": distance = ${distance}`);
				
				return distance <= 3;
			};

			const firstNameMatch = isMatchingName(searchQuery.firstName, profile.firstName);
			const lastNameMatch = isMatchingName(searchQuery.lastName, profile.lastName);
			const middleNameMatch = isMatchingName(searchQuery.middleName, profile.middleName);

			const hasMatch = (searchQuery.firstName ? firstNameMatch : true) &&
							(searchQuery.lastName ? lastNameMatch : true) &&
							(searchQuery.middleName ? middleNameMatch : true);

			if (hasMatch) {
				console.log('Found matching profile:', profile);
			}

			return hasMatch;
		});
	}
}
