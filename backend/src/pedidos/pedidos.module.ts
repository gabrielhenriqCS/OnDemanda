import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PedidosRepository } from './pedidos.repository';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, PedidosRepository],
})
export class PedidosModule {}
