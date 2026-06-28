import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { BusinessExceptionFilter } from './core/exception-filters/business-exception.filter';
import { NatsConfig } from './core/components/transporter/nats-transporter/nats.config';
import { NatsOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<NatsOptions>(NatsConfig, { inheritAppConfig: true });

  await app.startAllMicroservices();

  app.setGlobalPrefix('api/v1/items');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new BusinessExceptionFilter());

  const port = configService.get<number>('SERVER_HTTP_PORT') || 3001;
  await app.listen(port);
}
bootstrap();
