import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { InvalidEntityIdException } from 'src/utils/exeptions/InvalidEntityIdException';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
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

  async hashPassword (password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}
