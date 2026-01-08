import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async fazerLogin(
    email: string,
    senha: string,
    funcao: string,
  ): Promise<{ token_acesso: string; funcao: string; email: string; id: number }> {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Email inválido.');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Senha inválida.');
    }

    if (usuario.funcao !== funcao) {
      throw new UnauthorizedException('Função não está de acordo com as do usuário');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      funcao: usuario.funcao,
    };
    return {
      token_acesso: await this.jwtService.signAsync(payload),
      funcao: usuario.funcao,
      email: usuario.email,
      id: usuario.id
    };
  }
}
