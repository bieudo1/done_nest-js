import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access_token_public_key } from 'src/constraints/jwt.constraint';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
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