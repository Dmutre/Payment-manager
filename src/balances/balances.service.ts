import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { Payment } from '@prisma/client';

@Injectable()
export class BalancesService {
  constructor (
    private balanceRepository: BalanceRepository,
  ) {}

  async createBalance (userId: string) {
    return await this.balanceRepository.create({ userId })
  }

  async getBalance (userId: string) {
    return await this.balanceRepository.findOne({ userId })
  }

  async updateBalance (userId: string, payment: Payment) {
    let change;
    if(payment.type === 'INCOME') change = payment.amount;
    else change = -payment.amount;

    const balance = await this.balanceRepository.findOne({ userId });
    return await this.balanceRepository.update(userId, { balance: balance.balance + change})
  }
}
