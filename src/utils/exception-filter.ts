import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception;
  
      response.status(status).json({
        status: 'error',
        message: typeof message === 'string' ? message : message['message'],
        errors: message['errors'] || null,
      });
    }
  }
  