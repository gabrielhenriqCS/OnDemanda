import { Type } from "class-transformer";
import { ArrayMinSize, IsInt, ValidateNested } from "class-validator";
import { CreateItemPedidoDTO } from "./create-itempedido.dto";

export class CreatePedidoDTO {
    @IsInt()
    comandaId: number;

    @ValidateNested({ each: true })
    @Type(() => CreateItemPedidoDTO)
    @ArrayMinSize(1)
    itens: CreateItemPedidoDTO[];
}
