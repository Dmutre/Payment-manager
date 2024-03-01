import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class UserRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async find (where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
    });
  }
}