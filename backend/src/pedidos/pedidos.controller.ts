import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDTO } from './DTOs/create-pedido.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateStatusPedidoDTO } from './DTOs/update-status.dto';

@UseGuards(RolesGuard)
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/criar')
  @Roles(Role.ADMIN, Role.GARCOM, Role.ATENDENTE)
  create(@Body() data: CreatePedidoDTO) {
    return this.pedidosService.abrirPedido(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles(Role.ADMIN, Role.GARCOM, Role.ATENDENTE)
  findAll() {
    return this.pedidosService.mostrarPedidos();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':mesaId')
  findOne(@Param('mesaId') mesaId: string) {
    return this.pedidosService.encontrarPedido(+mesaId);
  }

  @HttpCode(HttpStatus.GONE)
  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.ATENDENTE)
  update(@Param('id') id: string, @Body() data: UpdateStatusPedidoDTO) {
    return this.pedidosService.atualizarStatus(+id, data.status);
  }
}
