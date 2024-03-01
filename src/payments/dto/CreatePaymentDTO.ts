import { PaymentType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsEnum(PaymentType, validationOptionsMsg('Type must be one of payment type'))
  type: PaymentType;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}