import { Injectable } from '@nestjs/common';
import { Prisma, usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.usuarioCreateInput): Promise<usuario> {
    return this.prisma.usuario.create({ data });
  }

  findAll(): Promise<usuario[]> {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }


  findByEmail(email: string): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  update(email: string, data: Prisma.usuarioUpdateInput): Promise<usuario> {
    return this.prisma.usuario.update({ where: { email }, data });
  }

  remove(email: string): Promise<usuario> {
    return this.prisma.usuario.delete({ where: { email } });
  }
}
