import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentLoggerService {
  private readonly logFilePath: string = path.join(
    __dirname,
    '../..',
    'payment_logs.txt',
  );

  constructor() {
    if (!fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, '');
    }
  }

  private appendToLog(logData: string) {
    fs.appendFileSync(this.logFilePath, logData + '\n');
  }

  logPaymentCreation(payment: Payment) {
    const logData = `Payment created - Type: ${payment.type}, CategoryId: ${payment.categoryId}, Date: ${payment.createdAt}, Amount: ${payment.amount}`;
    this.appendToLog(logData);
  }

  logPaymentUpdate(oldPayment: Payment, newPayment: Payment) {
    const logData = `Payment updated - Type: ${oldPayment.type} -> ${newPayment.type}, CategoryId: ${oldPayment.categoryId} -> ${newPayment.categoryId}, Date: ${oldPayment.createdAt} -> ${newPayment.createdAt}, Amount: ${oldPayment.amount} -> ${newPayment.amount}`;
    this.appendToLog(logData);
  }

  logPaymentDeletion(payment: Payment) {
    const logData = `Payment deleted - Type: ${payment.type}, CategoryId: ${payment.categoryId}, Date: ${payment.createdAt}, Amount: ${payment.amount}`;
    this.appendToLog(logData);
  }
}
