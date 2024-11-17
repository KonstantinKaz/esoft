import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { EstateController } from './estate.controller'
import { EstateService } from './estate.service'

@Module({
	controllers: [EstateController],
	providers: [EstateService, PrismaService],
})
export class EstateModule {}
