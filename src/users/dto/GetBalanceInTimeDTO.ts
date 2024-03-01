import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetBalanceDto {
  @IsNotEmpty()
  @IsDateString()
  time: string;
}