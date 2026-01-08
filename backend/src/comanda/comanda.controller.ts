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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('abrir')
  @Roles(Role.ADMIN, Role.GARCOM)
  create(@Body() data: CreateComandaDTO) {
    return this.comandaService.abrirComanda(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles(Role.ADMIN, Role.GARCOM)
  findAll() {
    return this.comandaService.mostrarComandas();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  @Roles(Role.ADMIN, Role.GARCOM)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.encontrarComanda(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/fechar')
  @Roles(Role.ADMIN, Role.GARCOM)
  update(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.comandaService.fecharComanda(+id);
  }

}
