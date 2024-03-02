import { PaymentType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentDTO {
  @ApiProperty({ enum: PaymentType, required: false, description: 'Type of payment' })
  @IsOptional()
  @IsEnum(PaymentType)
  type?: PaymentType;

  @ApiProperty({ type: Number, minimum: 0, required: false, description: 'Amount of payment' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiProperty({ type: String, required: false, description: 'Description of payment' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Category ID of payment' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
