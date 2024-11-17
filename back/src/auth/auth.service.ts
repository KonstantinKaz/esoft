import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'
import { verify } from 'argon2'
import { UserService } from 'src/user/user.service'
import { AuthClientDto, AuthRealtorDto } from './dto/clientAuth.dto'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private readonly jwt: JwtService,
		private readonly userService: UserService
	) {}

	async createClient(data: AuthClientDto) {
		return this.userService.createUser({
			...data,
			UserRole: 'CLIENT',
		})
	}

	async createRealtor(data: AuthRealtorDto) {
		return this.userService.createUser({
			...data,
			UserRole: 'REALTOR',
		})
	}

	async login(dto: AuthClientDto | AuthRealtorDto) {
		const { password, ...user } = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(user.id)
		return {
			user,
			...tokens,
		}
	}

	private async validateUser(dto: AuthClientDto | AuthRealtorDto) {
		const user = await this.userService.getEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')
		return user
	}

	private async issueTokenPair(userId: string) {
		const data = {
			id: userId
		}
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h',
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d',
		})

		return { accessToken, refreshToken }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')
			
		const {password, ...user} = await this.userService.getById(result.id)

		const tokens = await this.issueTokenPair(user.id)

		return {
			user,
			...tokens,
		}
	}
}
