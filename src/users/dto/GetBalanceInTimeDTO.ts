import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Time to get balance from (not included) in ISO string format',
  })
  @IsDateString()
  time: string;
}
