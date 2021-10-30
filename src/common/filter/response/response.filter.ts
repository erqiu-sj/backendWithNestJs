import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Message } from '../../../utils/generateError';

@Catch(HttpException)
export class CommonErrorFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse() as Message;
    const { message, result } = exceptionRes;
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      result,
    });
  }
}
