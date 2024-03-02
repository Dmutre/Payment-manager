import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalanceRepository } from './balance.repository';
import { PrismaModule } from '../database/prisma.module';

@Module({
  providers: [BalancesService, BalanceRepository],
  imports: [PrismaModule],
  exports: [BalancesService]
})
export class BalancesModule {}
