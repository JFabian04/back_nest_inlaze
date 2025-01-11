import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './utils/response.interceptor';
import { ExceptionsFilter } from './utils/exception-filter';
import * as cookieParser from 'cookie-parser';
import { SocketIoAdapter } from './utils/socket/socket-io.adapter';

process.env.TZ = 'UTC';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //adaptadaro para socker
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  
  //Config CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir cualquier origen (dev)
      callback(null, true);
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });


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
        console.log(formattedErrors);
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

  //Configurar Cokkies
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
