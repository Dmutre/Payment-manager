import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthModule,
    UsersModule,
    PaymentsModule,
    CategoriesModule,
  ],
  controllers: [CategoriesController],
})

export class AppModule {}
