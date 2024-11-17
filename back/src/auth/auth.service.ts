import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { AuthClientDto, AuthRealtorDto } from './dto/clientAuth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async createClient(data: AuthClientDto) {
		return this.userService.createUser({
			...data,
			role: 'CLIENT',
		})
	}

	async createRealtor(data: AuthRealtorDto) {
		return this.userService.createUser({
			...data,
			role: 'REALTOR',
		})
	}
}
