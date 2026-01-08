import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { CreateUsuarioDTO } from './DTOs/create-usuario.dto';
import { UpdateUsuarioDTO } from './DTOs/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuariosRepo: UsuariosRepository) {}

  async criarUsuario(data: CreateUsuarioDTO) {
    const hashSenha = await bcrypt.hash(data.senha, 10);
    return this.usuariosRepo.create({...data, senha: hashSenha});
  }

  async listarUsuarios() {
    return await this.usuariosRepo.findAll();
  }

  async encontrarUsuarioPorId(id: number) {
    return await this.usuariosRepo.findOne(id);
  }

  async buscarPorEmail(email: string) {
    const usuario = await this.usuariosRepo.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    }

    return usuario;
  }

  async atualizarUsuario(email: string, data: UpdateUsuarioDTO) {
    await this.buscarPorEmail(email);
    return this.usuariosRepo.update(email, data);
  }

  async deletarUsuario(email: string) {
    await this.buscarPorEmail(email);
    return this.usuariosRepo.remove(email);
  }
}
