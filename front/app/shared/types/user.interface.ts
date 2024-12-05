export interface IClientProfile {
	firstName?: string
	lastName?: string
	middleName?: string
	phone?: string
	email?: string
}

export interface IRealtorProfile {
	firstName: string
	lastName: string
	middleName: string
	phone: string
	email: string
	commission: number
}

export interface IUser {
	id: string
	role: 'ADMIN' | 'REALTOR' | 'CLIENT'
	clientProfile?: IClientProfile
	realtorProfile?: IRealtorProfile
	createdAt: string
}

export interface IUserEditInput extends Omit<IUser, 'id'> {
	password?: string
}
