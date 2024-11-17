import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AuthClientDto } from 'src/auth/dto/clientAuth.dto'

import { SearchUserDto } from './dto/search-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('get-all')
	async getUsers() {
		return this.userService.getUsers()
	}

	@Get(':email')
	async getEmail(@Param('email') email: string) {
		return this.userService.getEmail(email)
	}

	@Get('profile/:id')
	@Auth('CLIENT', 'REALTOR')
	async getProfile(@Param('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Delete('delete/:id')
	@Auth('CLIENT', 'REALTOR')
	async deleteUser(@Param('id') id: string) {
		return this.userService.deleteUser(id)
	}

	@Put('update/:id')
	@Auth('CLIENT', 'REALTOR')
	async updateUser(@Param('id') id: string, @Body() data: AuthClientDto) {
		return this.userService.updateUser(id, data)
	}

	@Post('search')
	// @Auth('CLIENT', 'REALTOR')
	async fuzzySearch(@Body() searchQuery: SearchUserDto) {
		return this.userService.fuzzySearch(searchQuery)
	}
}
