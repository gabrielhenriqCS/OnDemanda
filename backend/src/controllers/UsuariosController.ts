import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";


const usuariosService = new UsuarioService();

export class UsuariosController {
    async listarTodos(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await usuariosService.listarTodosOsUsuarios()
            res.status(200).json({
                status: 'success',
                data: usuarios
            })
        } catch (error) {
            res.status(500).json({message: 'Erro ao listar todos os usuários'})
        }
    }

    async criarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const criarNovoUsuario = usuariosService.criarUsuario
            res.status(201).json({
                status: 'success',
                data: criarNovoUsuario
            })
        } catch {
            res.status(500).json({message: 'Erro ao criar usuário'})
        }
    }

    async deletarUsuario(req: Request, res: Response, email: string): Promise<void> { 
        try {
            const deletarUsuario = usuariosService.deletarUsuario(email)
            res.status(200).json({
                status: 'success',
                data: deletarUsuario
            })
        } catch {
            res.status(500).json({message: 'Erro ar deletar usuário'})
        }
    }
}