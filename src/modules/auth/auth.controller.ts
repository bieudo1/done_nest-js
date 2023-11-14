import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username } = body;
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  @Post('login_1')
  async login_1(@Body() body: any) {
    const { username } = body;
    const payload = { username };

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding:  { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
    })
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h'
  });
   return accessToken;
  }
}
