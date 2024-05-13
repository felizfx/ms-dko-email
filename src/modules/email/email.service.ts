import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import { join } from 'path';
import { ConsumerService } from 'src/providers/queue/kafka/consumer.service';
import { ProducerService } from 'src/providers/queue/kafka/producer.service';

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(
    private readonly mailerService: MailerService,
    private readonly consumerService: ConsumerService,
    private readonly producerService: ProducerService,
  ) {}

  async sendNewPasswordMail(
    to: string,
    userName: string,
    token: string,
  ): Promise<void> {
    const viewPath = join(__dirname, '../../', 'views');
    const template = fs.readFileSync(`${viewPath}/new-password.html`, 'utf8');
    const html = template.replace('{name}', userName).replace('{token}', token);

    await this.mailerService.sendMail({
      to,
      subject: 'Alterção de senha',
      html,
    });
  }

  onModuleInit() {
    this.consumerService.consume(
			{
				topics: ["forgot_password_email_sender"],
				groupId: "send_email_consumer"
			},
			{
				eachMessage: async ({ message }) => {
					const value = JSON.parse(message.value.toString());
          this.sendNewPasswordMail(value.email, value.username, value.token)
				}
			}
		);
	}
}
