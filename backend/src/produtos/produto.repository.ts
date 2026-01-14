import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { produto, Prisma } from '@prisma/client';

@Injectable()
export class ProdutoRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.produtoCreateInput): Promise<produto> {
    return this.prisma.produto.create({ data });
  }

  findAll(): Promise<produto[]> {
    return this.prisma.produto.findMany();
  }

  findOne(id: number): Promise<produto | null> {
    return this.prisma.produto.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.produtoUpdateInput): Promise<produto> {
    return this.prisma.produto.update({ where: { id }, data });
  }

  delete(id: number): Promise<produto> {
    return this.prisma.produto.delete({ where: { id } });
  }
}
