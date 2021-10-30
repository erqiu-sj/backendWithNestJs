import { HttpException, HttpStatus } from '@nestjs/common';
import { Message } from './generateError';
export function successfulResponse(params: Message) {
  throw new HttpException(params, HttpStatus.OK);
}
