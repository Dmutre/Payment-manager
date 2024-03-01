import { Injectable } from '@nestjs/common';
import { Paymentrepository } from './payment.repository';
import { CreatePaymentDTO } from './dto/CreatePaymentDTO';
import { CategoryRepository } from 'src/categories/category.repository';
import { InvalidEntityIdException } from 'src/utils/exeptions/InvalidEntityIdException';
import { UpdatePaymentDTO } from './dto/UpdatePaymentDTO';
import { PaymentLogger } from './payment.logger';

@Injectable()
export class PaymentsService {
  constructor(
    private paymentRepository: Paymentrepository,
    private categoryRepository: CategoryRepository,
    private loggerService: PaymentLogger,
  ) {}

  async createPayment(data: CreatePaymentDTO, userId: string) {
    let category;
    if(data.categoryId) {
      category = await this.categoryRepository.findOne({id: data.categoryId});
    }
    if(!category) {
      throw new InvalidEntityIdException('Category');
    }
    return this.paymentRepository.create({
      ...data,
      userId: userId
    })
  }

  async getAllPayments(id: string) {
    return await this.paymentRepository.findAll();
  }

  async getOneById(id: string) {
    return await this.paymentRepository.findUnique({ id })
  }

  async updatePayment(data: UpdatePaymentDTO, id: string) {
    return await this.paymentRepository.updateOne(id, data)
  }

  async deletePayment(id: string) {
    return await this.paymentRepository.deleteOne(id);
  }
}
