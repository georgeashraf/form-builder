/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: 'http://localhost:4200', // attempted "origin":["http://localhost"]
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept,Authorization',
  };
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(options);
  // app.use(cookieParser());
  const reflector = new Reflector();
  // app.useGlobalGuards(new AcessTokenGuard(reflector));
  await app.listen(8000);
}

bootstrap();
