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
  BadRequestException,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDTO } from './DTOs/create-pedido.dto';
import { UpdateStatusPedidoDTO } from './DTOs/update-status.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/criar')
  create(@Body() data: CreatePedidoDTO) {
    return this.pedidosService.abrirPedido(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
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
  update(@Param('id') id: string, @Body() dto: UpdateStatusPedidoDTO) {
    if (!dto.status) {
      throw new BadRequestException('Status é obrigatório!');
    }
    return this.pedidosService.atualizarStatus(+id, dto.status);
  }
}
