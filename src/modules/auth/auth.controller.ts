import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
}
