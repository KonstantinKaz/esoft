import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { EstateModule } from './estate/estate.module';
import { OfferModule } from './offer/offer.module';
import { DemandModule } from './demand/demand.module';


@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, EstateModule, OfferModule, DemandModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
