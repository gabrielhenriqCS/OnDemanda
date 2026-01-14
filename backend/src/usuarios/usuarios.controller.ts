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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDTO } from './DTOs/create-usuario.dto';
import { UpdateUsuarioDTO } from './DTOs/update-usuario.dto';
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get('id=:id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.encontrarUsuarioPorId(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() usuarioDto: CreateUsuarioDTO) {
    return this.usuariosService.criarUsuario(usuarioDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':email')
  async encontrarPorEmail(@Param('email') email: string) {
    return this.usuariosService.buscarPorEmail(email);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':email')
  update(@Param('email') email: string, @Body() data: UpdateUsuarioDTO) {
    return this.usuariosService.atualizarUsuario(email, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.usuariosService.deletarUsuario(email);
  }
}
