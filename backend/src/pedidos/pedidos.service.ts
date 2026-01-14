
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
    const comanda = await this.prisma.comanda.findUnique({ where: { id: dto.comandaId } });
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    if (comanda.status === 'FECHADA') throw new BadRequestException('Comanda fechada');

    for (const item of dto.itens) {
      const produto = await this.prisma.produto.findUnique({ where: { id: item.produtoId } });
      if (!produto) throw new NotFoundException(`Produto ${item.produtoId} não encontrado`);
      if (!item.precoUnitario) item.precoUnitario = produto.preco;
      if (!item.precoTotal) item.precoTotal = item.precoUnitario * item.quantidade;
    }

    return await this.prisma.pedido.create({
      data: {
        comanda: { connect: { id: dto.comandaId } },
        itempedido: {
          create: dto.itens.map(i => ({
            produto: { connect: { id: i.produtoId } },
            quantidade: i.quantidade,
            observacao: i.observacao,
            precoUnitario: i.precoUnitario,
            precoTotal: i.precoTotal,
          }))
        },
        atualizadoEm: new Date('dd/MM/yyyy HH:MM'),
      },
      include: {
        itempedido: {
          include: { produto: true }
        }
      }
    })
  }

  mostrarPedidos() {
    return this.prisma.pedido.findMany({
      where: { status: 'PREPARANDO' },
      include: { itempedido: { include: { produto: true } }, comanda: { include: { mesa: true } } },
    });
  }

  encontrarPedido(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { itempedido: { include: { produto: true } }, comanda: true },
    });
  }

  async atualizarStatus(id: number, status: 'PREPARANDO' | 'PRONTO' | 'ENTREGUE') {
    const pedido = await this.encontrarPedido(id);
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    const updated = await this.prisma.pedido.update({ where: { id }, data: { status } });
    return updated;
  }
}
