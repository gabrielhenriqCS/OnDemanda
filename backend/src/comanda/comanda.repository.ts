import { Injectable } from '@nestjs/common';
import { comanda, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComandaRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.comandaCreateInput): Promise<comanda> {
    return this.prisma.comanda.create({ data });
  }

  findAll(): Promise<comanda[]> {
    return this.prisma.comanda.findMany({
      include: {
        mesa: true,
        pedido: true,
      },
    });
  }

  findById(id: number): Promise<comanda | null> {
    return this.prisma.comanda.findUnique({
      where: { id },
      include: {
        mesa: true,
        pedido: true,
      },
    });
  }

  update(id: number, data: Prisma.comandaUpdateInput): Promise<comanda> {
    return this.prisma.comanda.update({ where: { id }, data });
  }

  delete(id: number): Promise<comanda> {
    return this.prisma.comanda.delete({ where: { id } });
  }
}
