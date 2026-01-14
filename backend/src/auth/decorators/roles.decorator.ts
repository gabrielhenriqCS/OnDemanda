import { SetMetadata } from "@nestjs/common";
import { usuario_funcao } from "@prisma/client";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: usuario_funcao[]) => SetMetadata(ROLES_KEY, roles);