import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { httpOptions } from './config/httpAdapter';

import { ENV, Environment } from '@/app.environment';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(httpOptions),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  app.flushLogs();

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
      },
    },
  });

  await app.register(cors);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (ENV.NODE_ENV === Environment.PRODUCTION) {
    app.enableShutdownHooks();
  }

  await app.listen(ENV.PORT, '0.0.0.0');
}

bootstrap().catch(console.error);
