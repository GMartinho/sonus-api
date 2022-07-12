import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptions = {
      P2000: () => {
        const statusP2000 = HttpStatus.BAD_REQUEST;

        const messageP2000 = exception.meta['target'].map((target: string) => {
          return `The provided value for ${target} is too long`;
        });

        return {
          statusCode: statusP2000,
          message: messageP2000.length < 2 ? messageP2000.toString() : messageP2000,
          error: 'Bad Request'
        }
      },
      P2002: () => {
        const statusP2002 = HttpStatus.CONFLICT;

        const messageP2002 = exception.meta['target'].map((target: string) => {
          return `This ${target} has already been registered`;
        });

        return {
          statusCode: statusP2002,
          message: messageP2002.length < 2 ? messageP2002.toString() : messageP2002,
          error: 'Conflict'
        }
      },
      P2012: () => {
        const statusP2012 = HttpStatus.BAD_REQUEST;

        const messageP2012 = exception.meta['target'].map((target: string) => {
          return `${target} is required`;
        });

        return {
          statusCode: statusP2012,
          message: messageP2012.length < 2 ? messageP2012.toString() : messageP2012,
          error: 'Bad Request'
        }
      },
      P2025: () => {
        const statusP2025 = HttpStatus.NOT_FOUND;

        const messageP2025 = exception.meta['cause'];

        return {
          statusCode: statusP2025,
          message: messageP2025,
          error: 'Not Found'
        }
      }
    }

    const { statusCode, message, error } = exceptions[exception.code]();

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      error: error
    })

		// switch (exception.code) {
    //   case 'P2025':
    //     const statusP2025 = HttpStatus.NOT_FOUND;

    //     const messageP2025 = exception.meta['cause'];

    //     response.status(statusP2025).json({
    //       statusCode: statusP2025,
    //       message: messageP2025,
    //     });

    //     break;

    //   case 'P2002':
    //     const statusP2002 = HttpStatus.CONFLICT;

    //     const messageP2002 = exception.meta['target'].map((target) => {
    //       return `This ${target} has already been registered`;
    //     });

    //     response.status(statusP2002).json({
    //       statusCode: statusP2002,
    //       message: messageP2002,
    //     });

    //     break;

    //   default:
    //     // default 500 error code
    //     super.catch(exception, host);
    //     break;
    // }
  }
}