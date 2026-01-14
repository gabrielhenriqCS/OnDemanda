import { pedido_status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateStatusPedidoDTO {
    @IsEnum(pedido_status)
    status:pedido_status
}