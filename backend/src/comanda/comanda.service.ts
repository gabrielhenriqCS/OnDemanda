import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusComanda, StatusMesa } from '@prisma/client';


@Injectable()
export class ComandaService {
  constructor(private prisma: PrismaService) {}

  async abrirComanda(dto: CreateComandaDTO) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id: dto.mesaId } });
    if (!mesa) throw new NotFoundException('Mesa não encontrada');
    if (mesa.status === StatusMesa.OCUPADA) {
      throw new BadRequestException('Mesa já está ocupada');
    }

    const [comanda] = await this.prisma.$transaction([
      this.prisma.comanda.create({
        data: {
          cliente: dto.cliente,
          mesa: { connect: { id: dto.mesaId } },
        },
      }),
      this.prisma.mesa.update({
        where: { id: dto.mesaId },
        data: { status: StatusMesa.OCUPADA },
      }),
    ]);

    return comanda;
  }

  mostrarComandas() {
    return this.prisma.comanda.findMany({
      include: { mesa: true, pedidos: { include: { itens: { include: { produto: true } } } } },
    });
  }

  async encontrarComanda(id: number) {
    const comanda = await this.prisma.comanda.findUnique({
      where: { id },
      include: { mesa: true, pedidos: { include: { itens: { include: { produto: true } } } } },
    });
    if (!comanda) throw new NotFoundException('Comanda não encontrada');
    return comanda;
  }

  async fecharComanda(id: number) {
    const comanda = await this.encontrarComanda(id);

    const pendente = await this.prisma.pedido.count({
      where: { comandaId: id, status: 'PREPARANDO' },
    });
    if (pendente > 0) {
      throw new BadRequestException('Existem pedidos em preparo. Confirme antes de fechar.');
    }

    await this.prisma.$transaction([
      this.prisma.comanda.update({ where: { id }, data: { status: StatusComanda.FECHADA } }),
      this.prisma.mesa.update({ where: { id: comanda.mesaId }, data: { status: StatusMesa.LIVRE } }),
    ]);

    return { message: 'Comanda fechada e mesa liberada' };
  }
}
