import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [UsersService, UserRepository],
  imports: [PrismaModule],
  controllers: [UsersController],
  exports: [UserRepository]
})
export class UsersModule {}
