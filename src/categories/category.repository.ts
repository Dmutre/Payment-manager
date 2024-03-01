import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class CategoryRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findOne(where: Prisma.CategoryWhereInput) {
    return await this.prisma.category.findFirst({ where })
  }
}