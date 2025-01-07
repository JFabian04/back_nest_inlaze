import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError) 
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Respuesta genérica para errores de BD
    response.status(500).json({
      statusCode: 500,
      message: 'Error de base de datos: ' + exception.message,
      detail: exception.message || exception.message,
    });
  }
}
