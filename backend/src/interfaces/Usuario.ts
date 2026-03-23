import { usuario_funcao } from "@prisma/client"

// usado na criação — sem id
export interface CriarUsuarioDTO {
  nome: string
  email: string
  senha: string
  funcao: usuario_funcao
}

// representa o usuário completo vindo do banco — com id
export interface Usuario {
  id: number
  nome: string
  email: string
  senha: string
  funcao: usuario_funcao
}