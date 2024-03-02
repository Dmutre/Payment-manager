import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/security/JwtGuard';
import { GetBalanceDto } from './dto/GetBalanceInTimeDTO';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @ApiOperation({ summary: 'Endpoint to get balance of the User' })
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
