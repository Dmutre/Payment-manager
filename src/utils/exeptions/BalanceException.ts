import { HttpException, HttpStatus } from '@nestjs/common';

export class BalanceException extends HttpException {
  constructor () {
    super(`Payment operation is not available due to balance state`, HttpStatus.BAD_REQUEST);
  }
}