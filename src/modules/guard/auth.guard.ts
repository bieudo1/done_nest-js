import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    ) { }
  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      throw new ForbiddenException('Please provide access token')
    }
    const user = await this.jwtService.verifyAsync(token,{secret:JWT_SECRET_KEY })
    request.currentUser = user
    } catch (e) {
      throw new ForbiddenException('Invalid token or expired')
    }
    return true;
  }
}