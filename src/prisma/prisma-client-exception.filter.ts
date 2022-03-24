import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

		switch (exception.code) {
      case 'P2025':
        const statusP2025 = HttpStatus.NOT_FOUND;

        const messageP2025 = exception.meta['cause'];

        response.status(statusP2025).json({
          statusCode: statusP2025,
          message: messageP2025,
        });

        break;

      case 'P2002':
        const statusP2002 = HttpStatus.CONFLICT;

        const messageP2002 = exception.meta['target'].map((target) => {
          return `This ${target} has already been registered`;
        });

        response.status(statusP2002).json({
          statusCode: statusP2002,
          message: messageP2002,
        });

        break;

      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}