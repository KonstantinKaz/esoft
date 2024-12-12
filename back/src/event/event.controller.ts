import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { EventDto } from './dto/event.dto'
import { EventService } from './event.service'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Get('today')
	@Auth(['REALTOR'])
	async getTodayEvents(@CurrentUser('id') realtorId: string) {
		return this.eventService.getTodayEvents(realtorId)
	}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') realtorId: string) {
		return this.eventService.getAll(realtorId)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.eventService.getById(id)
	}

	@Post()
	@Auth()
	async create(@CurrentUser('id') realtorId: string, @Body() data: EventDto) {
		return this.eventService.create(realtorId, data)
	}

	@Put(':id')
	@Auth()
	async update(@Param('id') id: string, @Body() data: EventDto) {
		return this.eventService.update(id, data)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.eventService.delete(id)
	}
}
