import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  // const multerConfig = {
  //   storage: multer.memoryStorage(), // Store files in memory temporarily
  //   limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (e.g., 5MB)
  // };
  app.enableCors();
  app.setGlobalPrefix('api/');
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
