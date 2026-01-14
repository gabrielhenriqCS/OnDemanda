import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';

@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('abrir')
  create(@Body() data: CreateComandaDTO) {
    return this.comandaService.abrirComanda(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.comandaService.mostrarComandas();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.encontrarComanda(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/fechar')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.fecharComanda(+id);
  }
}
