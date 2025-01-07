import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Habilitar validaciones para DTO
   app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    // forbidNonWhitelisted: true,
    // transform: true,
    // stopAtFirstError: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
