import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { access_token_public_key } from 'src/constraints/jwt.constraint';
let returnTimes = 1

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
      const user = await this.jwtService.verifyAsync(token,{
        algorithms: ['RS256'],
			  publicKey:access_token_public_key,
    });
      request.currentUser = user.getUser
    } catch (e) {
      throw new ForbiddenException('Invalid token or expired')
    }
    return true;
  }
}