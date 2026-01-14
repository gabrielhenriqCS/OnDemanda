import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { comanda_status, mesa_status } from '@prisma/client';

@Injectable()
export class ComandaService {
  constructor(private prisma: PrismaService) {}

  async abrirComanda(dto: CreateComandaDTO) {
    const mesa = await this.prisma.mesa.findUnique({
      where: { id: dto.mesaId },
    });
    if (!mesa) throw new NotFoundException('Mesa não encontrada');
    if (mesa.status === mesa_status.OCUPADA) {
      throw new BadRequestException('Mesa já está ocupada');
    }

    const [comanda] = await this.prisma.$transaction([
      this.prisma.comanda.create({
        data: {
          cliente: dto.cliente,
          mesa: { connect: { id: dto.mesaId } },
          atualizadoEm: new Date(),
        },
      }),
      this.prisma.mesa.update({
        where: { id: dto.mesaId },
        data: { status: mesa_status.OCUPADA },
      }),
    ]);

    return comanda;
  }

  async mostrarComandas() {
    return await this.prisma.comanda.findMany({
      include: {
        mesa: true,
        pedido: {
          include: {
            itempedido: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });
  }

  async encontrarComanda(id: number) {
    const comanda = await this.prisma.comanda.findUnique({
      where: { id },
      include: {
        mesa: true,
        pedido: {
          include: {
            itempedido: {
              include: {
                produto: true,
              },
            },
          },
        },
      },
    });
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    const total = comanda.pedido.reduce((acc, pedido) => {
      const totalPedido = pedido.itempedido.reduce((sum, item) => sum + Number(item.precoTotal), 0);
      return acc + totalPedido;
    }, 0)

    return {
      ...comanda,
      total: total
    }
  }

  async fecharComanda(id: number) {
    const comanda = await this.encontrarComanda(id);

    const pendente = await this.prisma.pedido.count({
      where: { comandaId: id, status: 'PREPARANDO' },
    });
    if (pendente > 0) {
      throw new BadRequestException(
        'Existem pedidos em preparo. Confirme antes de fechar.',
      );
    }

    await this.prisma.$transaction([
      this.prisma.comanda.update({
        where: { id },
        data: { status: comanda_status.FECHADA },
      }),
      this.prisma.mesa.update({
        where: { id: comanda.mesaId },
        data: { status: mesa_status.LIVRE },
      }),
    ]);

    return { message: 'Comanda fechada e mesa liberada' };
  }
}
