import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { EstateDto } from './dto/estate.dto'
import { EstateService } from './estate.service'
import { EstateSearchDto } from './dto/estate-search.dto'

@Controller('estate')
export class EstateController {
	constructor(private readonly estateService: EstateService) {}

	@Post('create')
	async createEstate(@Body() data: EstateDto) {
		return this.estateService.createEstate(data)
	}

	@Put('update/:id')
	async updateEstate(@Param('id') id: string, @Body() data: EstateDto) {
		return this.estateService.updateEstate(id, data)
	}

	@Delete('delete/:id')
	async deleteEstate(@Param('id') id: string) {
		return this.estateService.deleteEstate(id)
	}

	@Get('get-all')
	async getEstates(@Query() filter: Partial<EstateDto>) {
		return this.estateService.getEstates(filter)
	}

	@Post('search')
	async searchEstates(@Body() searchParams: EstateSearchDto) {
		return this.estateService.searchEstates(searchParams);
	}
}
