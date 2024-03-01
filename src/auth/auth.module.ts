import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/security/LocalStrategy';
import { LocalAuthGuard } from 'src/security/LocalGuard';
import { JwtStrategy } from 'src/security/JwtStrategy';
import { JwtGuard } from 'src/security/JwtGuard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { BalancesModule } from 'src/balances/balances.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy, JwtGuard],
  imports: [ JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '8640000s' },
  }), UsersModule, BalancesModule],
  exports: [AuthService],
})
export class AuthModule {}
