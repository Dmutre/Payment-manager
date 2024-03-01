import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/security/JwtGuard';
import { LocalAuthGuard } from 'src/security/LocalGuard';
import { CreateUserDTO } from 'src/users/dto/CreateUserDTO';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  
  @Post('/registration')
  async registrate(
    @Body() data: CreateUserDTO,
  ) {
    return await this.authService.registrate(data);
  } 
  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req
  ) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  async refreshToken(
    @Request() req
  ) {
    return this.authService.refresh(req.user);
  }
}
