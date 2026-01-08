// src/pedidos/pedidos.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDTO } from './DTOs/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async abrirPedido(dto: CreatePedidoDTO) {
    // valida comanda
    const comanda = await this.prisma.comanda.findUnique({ where: { id: dto.comandaId } });
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    if (comanda.status === 'FECHADA') throw new BadRequestException('Comanda fechada');

    // valida produtos e calcula preços se necessário
    for (const item of dto.itens) {
      const produto = await this.prisma.produto.findUnique({ where: { id: item.produtoId } });
      if (!produto) throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
      if (!item.precoUnitario) item.precoUnitario = produto.preco;
      if (!item.precoTotal) item.precoTotal = item.precoUnitario * item.quantidade;
    }

    // cria pedido com itens (transação implícita by prisma create include)
    const pedido = await this.prisma.pedido.create({
      data: {
        comanda: { connect: { id: dto.comandaId } },
        // se usar ItemPedido model
        itens: {
          create: dto.itens.map(i => ({
            produto: { connect: { id: i.produtoId } },
            quantidade: i.quantidade,
            observacao: i.observacao,
            precoUnitario: i.precoUnitario,
            precoTotal: i.precoTotal,
          })),
        },
      },
      include: { itens: { include: { produto: true } } },
    });

    // opcional: atualizar updatedAt da comanda (Prisma já faz)
    return pedido;
  }

  mostrarPedidos() {
    return this.prisma.pedido.findMany({
      where: { status: 'PREPARANDO' },
      include: { itens: { include: { produto: true } }, comanda: { include: { mesa: true } } },
    });
  }

  encontrarPedido(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { itens: { include: { produto: true } }, comanda: true },
    });
  }

  async atualizarStatus(id: number, status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE') {
    const pedido = await this.encontrarPedido(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    const updated = await this.prisma.pedido.update({ where: { id }, data: { status } });
    return updated;
  }
}
