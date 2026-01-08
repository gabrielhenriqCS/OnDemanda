import { Injectable } from '@nestjs/common';
import { Comanda, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComandaRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ComandaCreateInput): Promise<Comanda> {
    return this.prisma.comanda.create({ data });
  }

  findAll(): Promise<Comanda[]> {
    return this.prisma.comanda.findMany({
      include: {
        mesa: true,
        pedidos: true,
      },
    });
  }

  findById(id: number): Promise<Comanda | null> {
    return this.prisma.comanda.findUnique({
      where: { id },
      include: {
        mesa: true,
        pedidos: true,
      },
    });
  }

  update(id: number, data: Prisma.ComandaUpdateInput): Promise<Comanda> {
    return this.prisma.comanda.update({ where: { id }, data });
  }

  delete(id: number): Promise<Comanda> {
    return this.prisma.comanda.delete({ where: { id } });
  }
}
