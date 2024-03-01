import { Controller, Get, UseGuards, Request, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/security/JwtGuard';
import { GetBalanceDto } from './dto/GetBalanceInTimeDTO';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtGuard)
  @Get('/balance')
  async getUser(
    @Request() req,
    @Query() getBalanceDto: GetBalanceDto
  ) {
    const date = new Date(getBalanceDto.time);
    return this.userService.getBalanceFromTime(date, req.user);
  }
}
