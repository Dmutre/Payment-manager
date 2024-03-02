import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../security/JwtGuard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/CreateCategoryDTO';
import { UpdateCategoryDTO } from './dto/UpdateCategoryDTO';
import { CategoryGuardOwnership } from './category.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
  ) {}


  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiResponse({ status: 200, description: 'Category created successfully' })
  @Post()
  async createCategory(
    @Request() req,
    @Body() data: CreateCategoryDTO,
  ) {
    return this.categoryService.createCategory(data, req.user.id);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories' })
  @Get()
  async getAllCategories(
    @Request() req,
  ) {
    return this.categoryService.getAllCategories(req.user.id)
  }

  @UseGuards(JwtGuard, CategoryGuardOwnership)
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', type: 'string' })
  @ApiBody({ type: UpdateCategoryDTO })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDTO
  ) {
    return this.categoryService.updateCategory(data, id)
  }

  @UseGuards(JwtGuard, CategoryGuardOwnership)
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @Delete('/:id')
  async deleteCategory(
    @Param('id') id: string,
  ) {
    return this.categoryService.deleteCategory(id)
  }
}
