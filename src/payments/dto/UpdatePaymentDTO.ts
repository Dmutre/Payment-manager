import { PaymentType } from "@prisma/client";
import { IsNotEmpty, IsEnum, IsNumber, Min, IsOptional, IsString } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class UpdatePaymentDTO {
  @IsOptional()
  @IsEnum(PaymentType, validationOptionsMsg('Type must be one of payment type'))
  type?: PaymentType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}