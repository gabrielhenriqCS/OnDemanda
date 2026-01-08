import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PedidosRepository {
    constructor(private prisma: PrismaService) { }
    
    create(data: Prisma.PedidoCreateInput) {
        return this.prisma.pedido.create({
            data,
            include: { itens: true },
        });
    }

    findAll() {
        return this.prisma.pedido.findMany({ include: { itens: true } });
    }

    findById(id: number) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: { itens: true },
        });
    }

    update(id: number, data: Prisma.PedidoUpdateInput) {
        return this.prisma.pedido.update({
            where: { id },
            data,
            include: { itens: true },
        });
    }

    delete(id: number) {
        return this.prisma.pedido.delete({where: {id}});
    }
}