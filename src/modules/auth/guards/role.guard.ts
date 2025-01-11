import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; 
    }
    
    const { user } = context.switchToHttp().getRequest(); 
    console.log(user);
    if (!user || !requiredRoles.some((rol) => user.rol?.includes(rol))) {
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }

    return true; 
  }
}