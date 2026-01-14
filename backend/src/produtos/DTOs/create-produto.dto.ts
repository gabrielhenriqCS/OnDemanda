import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProdutoDTO {
  @IsString()
  nome: string;

  @IsNumber()
  preco: number;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  categoria: string;
}
