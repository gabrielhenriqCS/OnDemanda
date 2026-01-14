import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PedidosRepository {
    constructor(private prisma: PrismaService) { }
    
    create(data: Prisma.pedidoCreateInput) {
        return this.prisma.pedido.create({
            data,
            include: { itempedido: true },
        });
    }

    findAll() {
        return this.prisma.pedido.findMany({ include: { itempedido: true } });
    }

    findById(id: number) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: { itempedido: true },
        });
    }

    update(id: number, data: Prisma.pedidoUpdateInput) {
        return this.prisma.pedido.update({
            where: { id },
            data,
            include: { itempedido: true },
        });
    }

    delete(id: number) {
        return this.prisma.pedido.delete({where: {id}});
    }
}