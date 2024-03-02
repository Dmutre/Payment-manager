import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';

@Injectable()
export class BalancesService {
  constructor(private balanceRepository: BalanceRepository) {}

  async createBalance(userId: string) {
    return await this.balanceRepository.create({ userId });
  }

  async getBalance(userId: string) {
    return await this.balanceRepository.findOne({ userId });
  }

  async updateBalance(userId: string, change: number) {
    const balance = await this.balanceRepository.findOne({ userId });
    return await this.balanceRepository.update(userId, {
      balance: balance.balance + change,
    });
  }
}
