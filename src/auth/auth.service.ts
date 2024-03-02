import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InvalidEntityIdException } from '../utils/exeptions/InvalidEntityIdException';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';
import { AlreadyRegisteredException } from '../utils/exeptions/AlreadyRegisteredException';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BalancesService } from '../balances/balances.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private balanceService: BalancesService,
    private jwtService: JwtService,
  ) {}

  async validateUser (username: string, password: string) {
    const user = await this.userRepository.find({
      username
    });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    const isMatch = await this.checkPassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }
    delete user.password;
    return user;
  }

  private async checkPassword (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async registrate(data: CreateUserDTO) {
    if(await this.checkIfUserAlreadyRegistered(data.username)) {
      throw new AlreadyRegisteredException();
    }

    data.password = await this.hashPassword(data.password);


    const user = await this.userRepository.create(data);
    await this.balanceService.createBalance(user.id)
    return this.generateTokens(user);
  }

  private async checkIfUserAlreadyRegistered(username: string) {
    const user = this.userRepository.find({
      username
    });

    return user;
  }

  private generateTokens(user: User) {
    const payload = this.createPayload(user);

    return {
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_TTL
      }),
      access_token: this.jwtService.sign(payload),
    };
  }

  private createPayload(user: User) {
    return {
      sub: user.id,
      username: user.username,
      createdAt: Date.now()
    }
  }

  async login(user: User) {
    return this.generateTokens(user);
  }

  refresh(user: User) {
    const payload = this.createPayload(user);
    return this.generateAccessToken(payload);
  }

  generateAccessToken(payload) {
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
