import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigurationService {
  constructor(private readonly configServive: ConfigService) {}

  get email() {
    return this.configServive.get<string>('email.email');
  }

  get senha() {
    return this.configServive.get<string>('email.senha');
  }
}
