import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AuthClientDto } from 'src/auth/dto/clientAuth.dto'

import { SearchUserDto } from './dto/search-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async createUser(@Body() data: AuthClientDto) {
		return this.userService.createUser(data)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@Get('by-email/:email')
	async getEmail(@Param('email') email: string) {
		return this.userService.getEmail(email)
	}

	@Get('profile/:id')
	async getProfile(@Param('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Delete(':id')
	// @Auth('CLIENT', 'REALTOR')
	async deleteUser(@Param('id') id: string) {
		return this.userService.deleteUser(id)
	}

	@Put('update/:id')
	async updateUser(@Param('id') id: string, @Body() data: AuthClientDto) {
		console.log('Updating user:', id, data)
		return this.userService.updateUser(id, data)
	}

	@Post('search')
	// @Auth('CLIENT', 'REALTOR')
	async fuzzySearch(@Body() searchQuery: SearchUserDto) {
		return this.userService.fuzzySearch(searchQuery)
	}
}
