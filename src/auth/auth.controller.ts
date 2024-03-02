import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtGuard } from '../security/JwtGuard';
import { LocalAuthGuard } from '../security/LocalGuard';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';
import { LoginUserDTO } from './dto/LoginUserDTO';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDTO, description: 'User data for registration' })
  async registrate(@Body() data: CreateUserDTO) {
    return await this.authService.registrate(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDTO, description: 'User credentials for login' })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('/refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh JWT token' })
  async refreshToken(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
