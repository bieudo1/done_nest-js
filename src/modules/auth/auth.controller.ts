import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthService } from './auth.service';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
  async create(@Body() requestBody: any) {
    const payload = await this.authService.create(requestBody)
    const token = this.jwtService.sign(payload, { secret: JWT_SECRET_KEY });
    return { token };
  }

  @Post('login_1')
  async login_1(@Body()requestBody: any) {
    const {name,id,email,roles} = await this.authService.login_1(requestBody)
    const payload = ({ name, email, id, roles })
    const token = this.jwtService.sign(payload, { secret: JWT_SECRET_KEY });
    return { token,name,id,email };
  }
}
