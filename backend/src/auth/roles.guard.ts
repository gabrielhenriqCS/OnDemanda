import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    
    canActivate(context: ExecutionContext): boolean {
        const reqRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!reqRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return reqRoles.some((role) => user.funcao === role)
    }
}