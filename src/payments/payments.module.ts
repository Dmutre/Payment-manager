import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Paymentrepository } from './payment.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PaymentLogger } from './payment.logger';

@Module({
  providers: [PaymentsService, Paymentrepository, PaymentLogger],
  controllers: [PaymentsController],
  imports: [PrismaModule, CategoriesModule],
})
export class PaymentsModule {}
