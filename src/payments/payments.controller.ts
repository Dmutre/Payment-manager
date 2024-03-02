import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/CreatePaymentDTO';
import { JwtGuard } from 'src/security/JwtGuard';
import { UpdatePaymentDTO } from './dto/UpdatePaymentDTO';
import { PaymentOwnerGuard } from './payment.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentService: PaymentsService,
  ) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDTO })
  @UseGuards(JwtGuard)
  @Post()
  async createPayment(
    @Request() req,
    @Body() data: CreatePaymentDTO,
  ) {
    return this.paymentService.createPayment(data, req.user.id);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'List of payments' })
  @UseGuards(JwtGuard)
  @Get()
  async getAllPayment(
    @Request() req,
  ) {
    return this.paymentService.getAllPayments(req.user.id)
  }

  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @ApiBody({ type: UpdatePaymentDTO })
  @UseGuards(JwtGuard, PaymentOwnerGuard)
  @Patch('/:id')
  async updatePayment(
    @Param('id') id: string,
    @Body() data: UpdatePaymentDTO
  ) {
    return this.paymentService.updatePayment(data, id)
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @UseGuards(JwtGuard, PaymentOwnerGuard)
  @Delete('/:id')
  async deletePayment(
    @Param('id') id: string,
  ) {
    return this.paymentService.deletePayment(id)
  }
}
