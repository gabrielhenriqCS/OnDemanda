import { CriarUsuarioDTO, Usuario } from "../interfaces/Usuario";
import prisma from "../lib/prisma";
import bcrypt from 'bcrypt';

export class UsuarioService {
    async buscarUsuarioPorEmail(email: string) {
        return await prisma.usuario.findUnique({ where: {email}})
    }

    async criarUsuario(dados: CriarUsuarioDTO) {
        const senhaHash = await bcrypt.hash(dados.senha, 10)
        return await prisma.usuario.create({
            data: { ...dados, senha: senhaHash }
         });
    }
}