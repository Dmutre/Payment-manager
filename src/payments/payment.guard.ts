import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PaymentsService } from './payments.service';

@Injectable()
export class PaymentOwnerGuard implements CanActivate {
  constructor(private readonly paymentsService: PaymentsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const paymentId = request.params.id;

    return this.validateOwnership(user.id, paymentId);
  }

  async validateOwnership(userId: string, paymentId: string): Promise<boolean> {
    const payment = await this.paymentsService.getOneById(paymentId);

    if (payment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this payment');
    }

    return true;
  }
}
