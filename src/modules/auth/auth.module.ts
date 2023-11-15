import * as crypto from 'crypto';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: crypto.randomBytes(32).toString('hex'),
      signOptions: { expiresIn: '60s' },
    }),
  TypeOrmModule.forFeature([User]),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
