import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";

const authService = new AuthService()

export class AuthController {
    async login(res: Response, req: Request) {
        try {
            const { email, senhaDigitada } = req.body;

            if (!email || !senhaDigitada) {
                return res.status(400).json({ message: "Email e senha são obrigatórios" });
            }

            const resposta = await authService.login(email, senhaDigitada)
            return res.status(200).json(resposta)
        } catch (error: any) {
            return res.status(401).json({ error: error.message})
        }
    }
}          
