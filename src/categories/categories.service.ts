import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDTO } from './dto/CreateCategoryDTO';
import { InvalidEntityIdException } from '../utils/exeptions/InvalidEntityIdException';
import { UpdateCategoryDTO } from './dto/UpdateCategoryDTO';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(data: CreateCategoryDTO, userId: string) {
    // Тут можна реалізувати логіку створення категорії
    return this.categoryRepository.create(data, userId);
  }

  async getAllCategories(userId: string) {
    return this.categoryRepository.findAll(userId);
  }

  async updateCategory(data: UpdateCategoryDTO, id: string) {
    return this.categoryRepository.updateOne(id, data);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findUnique({ id });
    if (!category) {
      throw new InvalidEntityIdException('Category');
    }
    return this.categoryRepository.deleteOne(id);
  }

  async getOneById(id: string) {
    return this.categoryRepository.findOne({ id });
  }
}
