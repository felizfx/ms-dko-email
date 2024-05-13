import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConfigurationModule } from 'src/config/email/configuration.module';
import { EmailConfigurationService } from 'src/config/email/configuration.service';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { KafkaModule } from 'src/providers/queue/kafka/kafka.module';

@Module({
  imports: [
    EmailConfigurationModule,
    MailerModule.forRootAsync({
      imports: [EmailConfigurationModule],
      useFactory: async (
        emailConfigurationService: EmailConfigurationService,
      ) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: emailConfigurationService.email,
            pass: emailConfigurationService.senha,
          },
        },
        defaults: {
          from: '"No Reply" <gabrielfelixpinho@gmail.com>',
        },
      }),
      inject: [EmailConfigurationService],
    } as MailerAsyncOptions),
    KafkaModule,
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
