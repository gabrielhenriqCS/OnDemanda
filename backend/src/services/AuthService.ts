import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

export class AuthService {
  async login(email: string, senhaDigitada: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) throw new Error("Usuário não encontrado");

    // Compara a senha digitada com o hash do banco (que criamos no seed)
    const senhaValida = await bcrypt.compare(senhaDigitada, usuario.senha);
    if (!senhaValida) throw new Error("Senha inválida");

    // Gera o token com o ID e a Função (ADMIN, GARCOM, etc)
    const token = jwt.sign(
      { id: usuario.id, funcao: usuario.funcao },
      process.env.SECRET_JWT!,
      { expiresIn: '1d' } 
    );

    return { 
      token, 
      usuario: { id: usuario.id, nome: usuario.nome, funcao: usuario.funcao } 
    };
  }
}