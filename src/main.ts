import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { GlobalHttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  // Increase payload size
  app.use(bodyParser.json({ limit: '10mb' })); // Adjust the size as needed
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors();
  app.setGlobalPrefix('api/');
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
