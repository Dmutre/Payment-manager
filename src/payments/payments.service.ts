import { BadRequestException, Injectable } from '@nestjs/common';
import { Paymentrepository } from './payment.repository';
import { CreatePaymentDTO } from './dto/CreatePaymentDTO';
import { CategoryRepository } from 'src/categories/category.repository';
import { InvalidEntityIdException } from 'src/utils/exeptions/InvalidEntityIdException';
import { UpdatePaymentDTO } from './dto/UpdatePaymentDTO';
import { PaymentLogger } from './payment.logger';
import { BalancesService } from 'src/balances/balances.service';
import { Payment, PaymentType } from '@prisma/client';
import { BalanceException } from 'src/utils/exeptions/BalanceException';

@Injectable()
export class PaymentsService {
  constructor(
    private paymentRepository: Paymentrepository,
    private categoryRepository: CategoryRepository,
    private balanceService: BalancesService,
    private loggerService: PaymentLogger,
  ) {}

  async createPayment(data: CreatePaymentDTO, userId: string) {
    const userBalance = await this.balanceService.getBalance(userId);

    if(data.categoryId) {
      const category = await this.categoryRepository.findOne({id: data.categoryId});
      if(!category) {
        throw new InvalidEntityIdException('Category');
      }
    }

    if(!this.isValidPayment(data.amount, data.type, userBalance.balance)) {
      throw new BalanceException();
    }

    const payment = await this.paymentRepository.create({
      ...data,
      userId: userId
    })

    await this.updateBalance(payment)

    return payment;
  }

  async getAllPayments(userId: string) {
    return await this.paymentRepository.findAll(userId);
  }

  private updateBalance(payment: Payment) {
    let change;
    if(payment.type === 'INCOME') change = payment.amount
    else change = -payment.amount;

    return this.balanceService.updateBalance(payment.userId, change);
  }

  async getOneById(id: string) {
    return await this.paymentRepository.findUnique({ id })
  }

  async updatePayment(data: UpdatePaymentDTO, id: string) {
    const payment = await this.paymentRepository.findUnique({ id });
    const balance = await this.balanceService.getBalance(payment.userId);
  
    const updatedBalance = this.calculateBalanceAfterUpdate(payment, data, balance.balance);
    console.log(updatedBalance)
    if (updatedBalance < 0) {
      throw new BadRequestException('Updating this payment would result in a negative balance.');
    }

    const updatedPayment = await this.paymentRepository.updateOne(id, data);
    this.updateBalanceOnUpdate(payment, data, balance.balance, updatedPayment);
  
    return updatedPayment;
  }
  
  private updateBalanceOnUpdate(payment: Payment, updatedData: UpdatePaymentDTO, balance: number, updatedPayment: Payment) {
    let change = 0;
    if (updatedData.amount !== undefined) {
      change = updatedData.amount - payment.amount;
    }
  
    if (updatedData.type !== undefined && updatedData.type !== payment.type) {
      if (updatedData.type === 'EXPENSE' && payment.type === 'INCOME' && (balance - payment.amount) < 0) {
        throw new BadRequestException('Changing payment type from income to expense would result in a negative balance.');
      }
      if (updatedData.type === 'INCOME' && payment.type === 'EXPENSE' && (balance + payment.amount) < updatedPayment.amount) {
        throw new BadRequestException('Changing payment type from expense to income would not make balance positive.');
      }
    }
  
    return this.balanceService.updateBalance(payment.userId, change);
  }
  
  private calculateBalanceAfterUpdate(payment: Payment, updatedData: UpdatePaymentDTO, currentBalance: number): number {
    let updatedBalance = currentBalance;
  
    if (updatedData.type !== undefined && updatedData.type !== payment.type) {
      if (updatedData.type === 'EXPENSE' && payment.type === 'INCOME') {
        updatedBalance -= payment.amount *2;
      } else if (updatedData.type === 'INCOME' && payment.type === 'EXPENSE') {
        updatedBalance += payment.amount*2;
      }
    }
  
    if (updatedData.amount !== undefined && updatedData.amount !== payment.amount) {
      const amountChange = updatedData.amount - payment.amount;
      updatedBalance -= payment.type === 'EXPENSE' ? amountChange : -amountChange;
    }
  
    return updatedBalance;
  }  

  async deletePayment(id: string) {
    const payment = await this.paymentRepository.findUnique({ id });
    const payments = await this.paymentRepository.findInTime(payment.createdAt, payment.userId);
    const balance = await this.balanceService.getBalance(payment.userId);
  
    const updatedBalance = this.calculateBalanceAfterDelete(payment, payments, balance.balance);
    if (updatedBalance < 0) {
      throw new BadRequestException('Deleting this payment would result in a negative balance.');
    }
  
    this.updateBalanceOnDelete(payment);

    return await this.paymentRepository.deleteOne(id);
    
  }

  private updateBalanceOnDelete(payment: Payment) {
    let change;
    if(payment.type === 'EXPENSE') change = payment.amount
    else change = -payment.amount;

    return this.balanceService.updateBalance(payment.userId, change);
  }
  
  private calculateBalanceAfterDelete(payment: Payment, payments: Payment[], currentBalance: number): number {
    const previousPaymentsTotal = payments.reduce((total, p) => total + (p.type === 'EXPENSE' ? p.amount : -p.amount), 0);
    
    let updatedBalance = currentBalance + payment.amount;
    if (payment.type === 'EXPENSE') {
      updatedBalance += previousPaymentsTotal;
    } else {
      updatedBalance -= previousPaymentsTotal;
    }
  
    return updatedBalance;
  }

  async getPaymentsAfterTime(date: Date, userId: string) {
    return await this.paymentRepository.findInTime(date, userId);
  }

  private isValidPayment(amount: number, type: PaymentType, balance: number) {
    if(type === 'EXPENSE') balance -= amount;

    return (balance >= 0)
  }
}
