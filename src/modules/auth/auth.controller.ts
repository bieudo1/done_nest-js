import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  async login(@Body() body: any) {
    const { username } = body;
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  @Post()
  async create(@Body() user: any) {
    const payload = await this.authService.create(user)
    const token = this.jwtService.sign(payload);
    return { token };
  }

  @Post('login_1')
  async login_1(@Body() user: any) {
    const payload = await this.authService.login_1(user)
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
