import { IsInt, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreateItemPedidoDTO {
  @IsInt()
  produtoId: number;

  @IsInt()
  @Min(1)
  quantidade: number;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsNumber()
  precoUnitario: number;

  @IsNumber()
  precoTotal: number;

}
