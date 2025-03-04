import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.digiakshara.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.digiakshara.com/fullchain.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // Increase payload size
  app.use(bodyParser.json({ limit: '10mb' })); // Adjust the size as needed
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.enableCors({
    origin: ['https://digiakshara.com', 'http://localhost:3000', '*'], // Allow frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api/');
  await app.listen(process.env.PORT || 443);
}
bootstrap();
