import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1/items');

  const port = configService.get<number>('SERVER_HTTP_PORT') || 3001;
  await app.listen(port);
}
bootstrap();
