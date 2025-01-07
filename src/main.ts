import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceptor';
import { ExceptionsFilter } from './utils/exception-filter';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones para DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException({
          status: 'error',
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  // Usar el interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  //filtro de excepciones
  app.useGlobalFilters(new ExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
