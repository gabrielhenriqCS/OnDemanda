import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Bcrypt } from './utils/bcrypt';
import { LoginDTO } from './login.dto';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<any> {
    const buscarUsuario = await this.usuarioService.buscarPorEmail(email);

    if (!buscarUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const compararSenha = await this.bcrypt.compararSenhas(
      senha,
      buscarUsuario.senha,
    );

    if (buscarUsuario && compararSenha) {
      const { senha, ...resposta } = buscarUsuario;
      return resposta;
    }

    throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);
  }

  async login(login: LoginDTO) {
    const buscaUsuario = await this.usuarioService.buscarPorEmail(login.email);

    if (!buscaUsuario) throw new HttpException('Usuário não encontrado!', HttpStatus.UNAUTHORIZED)
    
    const payload = { sub: buscaUsuario.id, email: buscaUsuario.email }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
