import { Error } from '@gui-nx/types';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

const getStatusError = (status: number): Error => {
  if (status === 401) {
    return {
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    };
  }

  if (status === 403) {
    return {
      code: 'FORBIDDEN',
      message: 'Forbidden',
    };
  }

  return {
    code: 'UNKNOWN',
    message: 'Unknown error',
  };
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const statusError = getStatusError(status);

    const responseBody = {
      errors: [statusError],
    };

    response.status(status).json(responseBody);
  }
}
