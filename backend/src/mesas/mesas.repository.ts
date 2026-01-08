import { Injectable } from '@nestjs/common';
import { Mesa, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesasRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.MesaCreateInput) {
    return this.prisma.mesa.create({ data });
  }

  findAll() {
    return this.prisma.mesa.findMany();
  }

  findById(id: number) {
    return this.prisma.mesa.findUnique({ where: { id } });
  }

  update(params: {
    where: Prisma.MesaWhereUniqueInput;
    data: Prisma.MesaUpdateInput;
  }): Promise<Mesa> {
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
