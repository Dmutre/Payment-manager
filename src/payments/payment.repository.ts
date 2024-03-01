import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class Paymentrepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: Prisma.PaymentUncheckedCreateInput) {
    return await this.prisma.payment.create({ data });
  }

  async findAll(userId: string) {
    return await this.prisma.payment.findMany({ where: { userId }});
  }

  async findUnique(where: Prisma.PaymentWhereUniqueInput) {
    return await this.prisma.payment.findUnique({ where })
  }

  async updateOne(id: string, data: Prisma.PaymentUpdateInput) {
    return await this.prisma.payment.update({
      where: { id },
      data: {...data},
    });
  }

  async deleteOne(id: string) {
    return await this.prisma.payment.delete({ where: { id }});
  }

  async findInTime(date: Date, userId: string) {
    return await this.prisma.payment.findMany({
      where: {
        userId: userId,
        createdAt: {
          gt: date,
        },
      },
    });
  }
}