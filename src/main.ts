import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './auth/pipes/validation.pipe';
import { createConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000, () => {
    console.log(`server listen http://localhost:${process.env.PORT}`);

  });
}
bootstrap();
