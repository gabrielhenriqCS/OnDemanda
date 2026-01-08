import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDTO } from './DTOs/create-mesa.dto';
import { UpdateMesaDTO } from './DTOs/update-mesa.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller('mesas')
export class MesasController {
  constructor(private mesaService: MesasService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/criar')
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateMesaDTO) {
    return this.mesaService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.mesaService.findAll();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.mesaService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @Roles(Role.ADMIN, Role.GARCOM)  
  atualizarMesa(@Param('id') id: number, @Body() dto: UpdateMesaDTO) {
    return this.mesaService.update(+id, dto);
  }

}
