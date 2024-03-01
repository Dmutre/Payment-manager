import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PaymentLogger implements LoggerService {
  log(message: string) {
    fs.appendFileSync('mylog.txt', message + '\n');
  }
  error(message: string, trace: string) {
    fs.appendFileSync('mylog.txt', message + '\n' + trace + '\n');
  }
  warn(message: string) {
    fs.appendFileSync('mylog.txt', message + '\n');
  }
  debug(message: string) {
    fs.appendFileSync('mylog.txt', message + '\n');
  }
  verbose(message: string) {
    fs.appendFileSync('mylog.txt', message + '\n');
  }
}
