import * as crypto from 'crypto';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: crypto.randomBytes(32).toString('hex'),
      signOptions: { expiresIn: '60s' },
    }),
  TypeOrmModule.forFeature([User]),

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
