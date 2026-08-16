import {
  AtualizarUsuarioDTO,
  CriarUsuarioDTO,
} from "../models/Usuario";

import {prisma} from "../helpers/prisma";
import bcrypt from "bcrypt";

export class UsuarioService {
  async listarTodosOsUsuarios() {
    return await prisma.usuario.findMany();
  }
  async buscarUsuarioPorEmail(email: string) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  async alterarDadosDoUsuario(
    email: string,
    dados: AtualizarUsuarioDTO,
  ) {
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    return await prisma.usuario.update({
      where: { email },
      data: dados,
    });
  }

  async criarUsuario(dadosUsuario: CriarUsuarioDTO) {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email: dadosUsuario.email },
    });

    if (usuarioExiste) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);
    return await prisma.usuario.create({
      data: {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: senhaHash,
        funcao: dadosUsuario.funcao,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        funcao: true,
      },
    });
  }

  async deletarUsuario(email: string) {
    if (!email) {
      throw new Error("E-mail é obrigatorio");
    }

    const usuarioExiste = await this.buscarUsuarioPorEmail(email);
    if (!usuarioExiste) {
      throw new Error("Usuário não existe");
    }
    return await prisma.usuario.delete({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        funcao: true,
      }
    });
  }
}
