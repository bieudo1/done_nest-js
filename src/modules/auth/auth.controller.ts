import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) { }

  @Post()
  async create(@Body() requestBody: any) {
    return await this.authService.create(requestBody);
  }

  @Post('login')
  async login(@Body()requestBody: any) {
    return await this.authService.login(requestBody);
  }
}
