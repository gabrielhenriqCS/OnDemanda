import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDTO } from './DTOs/create-produto.dto';
import { UpdateProdutoDTO } from './DTOs/update-produto.dto';
import { Public } from 'src/auth/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async listarProduto() {
    return this.produtoService.listarProdutos();
  }

  @Public()
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.encontrarProdutoPorId(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() data: CreateProdutoDTO) {
    return this.produtoService.criarProduto(data);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProdutoDTO,
  ) {
    return this.produtoService.atualizarProduto(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.deletarProduto(id);
  }
}
