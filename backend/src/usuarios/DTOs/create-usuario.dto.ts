import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUsuarioDTO {
  
  @IsString()
  @IsNotEmpty()
  nome: string;

  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  senha: string;

  
  @IsNotEmpty()
  @IsEnum(Role)
  funcao: Role;
}
