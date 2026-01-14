import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
    async codificarSenha(senha: string): Promise<string> {
        let caracteres: number = 5
        return await bcrypt.hash(senha, caracteres)
    }

    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
    
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
        
    }
}