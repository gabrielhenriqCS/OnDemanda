import { Injectable } from '@nestjs/common';
import { mesa, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesasRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.mesaCreateInput) {
    return this.prisma.mesa.create({ data });
  }

  findAll() {
    return this.prisma.mesa.findMany();
  }

  findById(id: number) {
    return this.prisma.mesa.findUnique({ where: { id } });
  }

  update(params: {
    where: Prisma.mesaWhereUniqueInput;
    data: Prisma.mesaUpdateInput;
  }): Promise<mesa> {
    const { where, data } = params;
    return this.prisma.mesa.update({
      data,
      where,
    });
  }

  delete(id: number) {
    return this.prisma.mesa.delete({ where: { id } });
  }
}
