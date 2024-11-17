import { IsString, MinLength } from 'class-validator'

export class AuthUserDto {
	@IsString()
	firstName?: string

	@IsString()
	lastName?: string

	@IsString()
	email?: string

	@IsString()
	phone?: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string
}

export class AuthClientDto {
	@IsString()
	firstName?: string

	@IsString()
	lastName?: string

	@IsString()
	email?: string

	@IsString()
	phone?: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string
}

export class AuthRealtorDto {
	@IsString()
	firstName: string

	@IsString()
	lastName: string

	@IsString()
	email: string

	@IsString()
	phone: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string
}
