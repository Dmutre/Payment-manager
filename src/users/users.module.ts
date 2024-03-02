import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { BalancesModule } from 'src/balances/balances.module';

@Module({
  providers: [UsersService, UserRepository],
  imports: [PrismaModule, PaymentsModule, BalancesModule],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule {}
