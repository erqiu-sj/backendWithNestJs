import { HttpException, HttpStatus } from '@nestjs/common';
export interface Message {
  message: string;
  result: unknown;
}
export function generateError(params: Message, code: HttpStatus) {
  throw new HttpException(params, code);
}
