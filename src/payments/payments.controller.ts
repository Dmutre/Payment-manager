import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/CreatePaymentDTO';
import { JwtGuard } from 'src/security/JwtGuard';
import { UpdatePaymentDTO } from './dto/UpdatePaymentDTO';
import { PaymentOwnerGuard } from './payment.guard';

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentService: PaymentsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createPayment(
    @Request() req,
    @Body() data: CreatePaymentDTO,
  ) {
    return this.paymentService.createPayment(data, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllPayment(
    @Request() req,
  ) {
    return this.paymentService.getAllPayments(req.user.id)
  }

  @UseGuards(JwtGuard, PaymentOwnerGuard)
  @Patch('/:id')
  async updatePayment(
    @Param('id') id: string,
    @Body() data: UpdatePaymentDTO
  ) {
    return this.paymentService.updatePayment(data, id)
  }

  @UseGuards(JwtGuard, PaymentOwnerGuard)
  @Delete('/:id')
  async deletePayment(
    @Param('id') id: string,
  ) {
    return this.paymentService.deletePayment(id)
  }
}
