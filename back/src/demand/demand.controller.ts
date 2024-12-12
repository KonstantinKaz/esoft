import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { DemandService } from './demand.service'
import { DemandDto } from './dto/demand.dto'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('demands')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Get()
  async getAll() {
    return this.demandService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.demandService.getById(id)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() data: DemandDto) {
    console.log('Controller received create request:', data)
    try {
      const result = await this.demandService.create(data)
      console.log('Successfully created demand:', result)
      return result
    } catch (error) {
      console.error('Controller error:', error)
      throw error
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() data: DemandDto) {
    return this.demandService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.demandService.delete(id)
  }
}
