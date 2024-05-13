import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  email: process.env.EMAIL,
  senha: process.env.EMAIL_SENHA,
}));
