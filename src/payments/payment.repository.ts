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

  async findAll() {
    return await this.prisma.payment.findMany();
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
}