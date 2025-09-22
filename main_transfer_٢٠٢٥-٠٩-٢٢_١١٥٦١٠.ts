import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT || 3001);
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${process.env.PORT || 3001}`);
}
bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});