import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class BalanceRepository {
  constructor (
    private prisma: PrismaService
  ) {}

  async create(data: Prisma.BalanceUncheckedCreateInput) {
    return await this.prisma.balance.create({ data })
  }

  async findOne(where: Prisma.BalanceWhereInput) {
    return await this.prisma.balance.findFirst({ where });
  }

  async update(userId: string, data: Prisma.BalanceUpdateInput) {
    return await this.prisma.balance.updateMany({
      where: { userId },
      data
    })
  }
}