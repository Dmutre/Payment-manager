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

    await this.balanceService.updateBalance(userId, payment)

    return payment;
  }

  async getAllPayments(userId: string) {
    return await this.paymentRepository.findAll(userId);
  }

  async getOneById(id: string) {
    return await this.paymentRepository.findUnique({ id })
  }

  async updatePayment(data: UpdatePaymentDTO, id: string) {
    return await this.paymentRepository.updateOne(id, data)
  }

  async deletePayment(id: string) {
    return await this.paymentRepository.deleteOne(id);
  }

  async getPaymentsAfterTime(date: Date, userId: string) {
    return await this.paymentRepository.findInTime(date, userId);
  }

  private isValidPayment(amount: number, type: PaymentType, balance: number) {
    if(type === 'EXPENSE') balance -= amount;

    return (balance >= 0)
  }
}
