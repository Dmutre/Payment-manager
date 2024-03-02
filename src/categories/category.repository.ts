import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";
import { CreateCategoryDTO } from "./dto/CreateCategoryDTO";


@Injectable()
export class CategoryRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findOne(where: Prisma.CategoryWhereInput) {
    return await this.prisma.category.findFirst({ where })
  }

  async create(data: CreateCategoryDTO, userId: string) {
    return await this.prisma.category.create({ 
        data: {
          ...data,
          userId
      } 
    });
  }

  async findAll(userId: string) {
    return await this.prisma.category.findMany({ where: { userId }});
  }

  async findUnique(where: Prisma.CategoryWhereUniqueInput) {
    return await this.prisma.category.findUnique({ where })
  }

  async updateOne(id: string, data: Prisma.CategoryUpdateInput) {
    return await this.prisma.category.update({
      where: { id },
      data: {...data},
    });
  }

  async deleteOne(id: string) {
    return await this.prisma.category.delete({ where: { id }});
  }
}
