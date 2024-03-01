import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './category.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { CategoryGuardOwnership } from './category.guard';

@Module({
  providers: [CategoriesService, CategoryRepository, CategoryGuardOwnership],
  controllers: [CategoriesController],
  imports: [PrismaModule],
  exports: [CategoryRepository]
})
export class CategoriesModule {}
