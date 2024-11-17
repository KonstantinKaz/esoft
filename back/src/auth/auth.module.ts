import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RolesGuard } from './guards/roles.guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	controllers: [AuthController],
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET, // Убедитесь, что у вас есть секрет
			signOptions: { expiresIn: '60s' }, // Настройте время жизни токена
			// imports: [ConfigModule],
			// inject: [ConfigService],
			// useFactory: getJwtConfig,
		}),
		UserModule,
		ConfigModule,
	],
	providers: [JwtStrategy, PrismaService, AuthService, RolesGuard],
})
export class AuthModule {}
