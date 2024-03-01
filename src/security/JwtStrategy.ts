import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './JwtPayload';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userRepository.find({
        id: payload.sub,
    });

    delete user.password;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}