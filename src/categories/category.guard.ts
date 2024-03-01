import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoryGuardOwnership implements CanActivate {
  constructor(private readonly categoriesService: CategoriesService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const categoryId = request.params.id;

    return this.validateOwnership(user.id, categoryId);
  }

  async validateOwnership(userId: string, categoryId: string): Promise<boolean> {
    const payment = await this.categoriesService.getOneById(categoryId);

    if (payment.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this payment');
    }

    return true;
  }
}
