import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Paymentrepository } from './payment.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PaymentLoggerService } from './payment.logger';
import { UsersModule } from 'src/users/users.module';
import { BalancesModule } from 'src/balances/balances.module';

@Module({
  providers: [PaymentsService, Paymentrepository, PaymentLoggerService],
  controllers: [PaymentsController],
  imports: [PrismaModule, CategoriesModule, BalancesModule],
  exports: [PaymentsService]
})
export class PaymentsModule {}
