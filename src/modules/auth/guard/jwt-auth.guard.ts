import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  handleRequest(err, user, info: Error, context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const hasRole = () => user.roles.some(role => roles.includes(role));
    console.log(user,'xxxx');
    
    if (!user) {
      console.log('user');
      throw new UnauthorizedException();
    }
    if (!(user.roles && hasRole())) {
      console.log(user.roles && hasRole(),'aaa');
      throw new ForbiddenException('Forbidden');
    }
    return user && user.roles && hasRole();
  }
}
