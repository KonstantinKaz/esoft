import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('create')
  async create(@Body() data: OfferDto) {
    return this.offerService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: OfferDto) {
    return this.offerService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.offerService.delete(id);
  }

  @Get()
  async getAll() {
    return this.offerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.offerService.getById(id);
  }
}
