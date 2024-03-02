import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesModule } from './categories/categories.module';
import { BalancesModule } from './balances/balances.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthModule,
    UsersModule,
    PaymentsModule,
    CategoriesModule,
    BalancesModule,
  ],
})
export class AppModule {}
