import { PaymentType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDTO {
  @ApiProperty({ enum: PaymentType, description: 'Type of payment' })
  @IsNotEmpty()
  @IsEnum(PaymentType)
  type: PaymentType;

  @ApiProperty({ type: Number, minimum: 0, description: 'Amount of payment' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ type: String, required: false, description: 'Description of payment' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Category ID of payment' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
