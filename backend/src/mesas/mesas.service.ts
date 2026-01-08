// src/mesas/mesas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMesaDTO } from './DTOs/create-mesa.dto';
import { UpdateMesaDTO } from './DTOs/update-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMesaDTO) {
    return this.prisma.mesa.create({ data: dto });
  }

  findAll() {
    return this.prisma.mesa.findMany();
  }

  async findOne(id: number) {
    const mesa = await this.prisma.mesa.findUnique({ where: { id } });
    if (!mesa) throw new NotFoundException('Mesa não encontrada');
    return mesa;
  }

  update(id: number, dto: UpdateMesaDTO) {
    return this.prisma.mesa.update({ where: { id }, data: dto });
  }
}
