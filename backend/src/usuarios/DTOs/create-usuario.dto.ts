import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { usuario_funcao } from '@prisma/client';

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
  @IsEnum(usuario_funcao)
  funcao: usuario_funcao;
}
