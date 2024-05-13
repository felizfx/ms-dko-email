import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(8081);
}
bootstrap();
