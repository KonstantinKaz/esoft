import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthClientDto, AuthRealtorDto } from './dto/clientAuth.dto'
import { get } from 'http'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register/client')
	// @Auth('REALTOR', 'CLIENT')
	async registerUser(@Body() authClientDto: AuthClientDto) {
		return this.authService.createClient(authClientDto)
	}

	@Post('register/realtor')
	// @Auth('REALTOR', 'CLIENT')
	async registerRealtor(@Body() authRealtorDto: AuthRealtorDto) {
		return this.authService.createRealtor(authRealtorDto)
	}

	@Post('login')
	async login(@Body() dto: AuthClientDto | AuthRealtorDto) {
		return this.authService.login(dto)
	}
}
