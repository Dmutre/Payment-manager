import { Injectable } from '@nestjs/common';
import { Payment, User } from '@prisma/client';
import { PaymentsService } from '../payments/payments.service';
import { UserRepository } from './user.repository';
import { BalancesService } from '../balances/balances.service';

@Injectable()
export class UsersService {
  constructor(
    private paymentService: PaymentsService,
    private balanceService: BalancesService,
    private userRepository: UserRepository,
  ) {}

  async getBalanceFromTime(date: Date, user: User) {
    const payments = await this.paymentService.getPaymentsAfterTime(date, user.id);
    const balance = await this.balanceService.getBalance(user.id)
    const balanceInTime = this.countBalanceInTime(balance.balance, payments);
    return {balance: balanceInTime, payments}
  }

  countBalanceInTime (balance: number, payments: Payment[]) {
    for(const payment of payments) {
      if(payment.type === 'INCOME') balance -= payment.amount;
      else if(payment.type === 'EXPENSE') balance += payment.amount;
    }
    return balance;
  }

  async getBalance(id: string) {
    return await this.userRepository.find({ id });
  }
}
