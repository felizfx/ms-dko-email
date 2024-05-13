import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { AppConfigModule } from './config/app/configuartion.module';

@Module({
  imports: [
    EmailModule,
    AppConfigModule
  ],
})
export class AppModule {}
