import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    protected authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user =await this.getUserData(context);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async getUserData(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.get('authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.checkUserToken(accessToken);
    return user;
  }
  // handleRequest(err, user, info: Error, context: ExecutionContext) {
  //   const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //   if (!roles) {
  //     return true;
  //   }

  //   const hasRole = () => user.roles.some(role => roles.includes(role));
  //   console.log(user,'xxxx');

  //   if (!user) {
  //     console.log('user');
  //     throw new UnauthorizedException();
  //   }
  //   if (!(user.roles && hasRole())) {
  //     console.log(user.roles && hasRole(),'aaa');
  //     throw new ForbiddenException('Forbidden');
  //   }
  //   return user && user.roles && hasRole();
  // }
}
