import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/security/JwtGuard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async getUser(
    @Request() req,
  ) {
    return req.user.balance;
  }
}
