import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from 'src/security/JwtGuard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/CreateCategoryDTO';
import { UpdateCategoryDTO } from './dto/UpdateCategoryDTO';
import { CategoryGuardOwnership } from './category.guard';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createCategory(
    @Request() req,
    @Body() data: CreateCategoryDTO,
  ) {
    return this.categoryService.createCategory(data, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllCategories(
    @Request() req,
  ) {
    return this.categoryService.getAllCategories(req.user.id)
  }

  @UseGuards(JwtGuard, CategoryGuardOwnership)
  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDTO
  ) {
    return this.categoryService.updateCategory(data, id)
  }

  @UseGuards(JwtGuard, CategoryGuardOwnership)
  @Delete('/:id')
  async deleteCategory(
    @Param('id') id: string,
  ) {
    return this.categoryService.deleteCategory(id)
  }
}
