import { usuario_funcao } from "@prisma/client"
import z from "zod"

// usado na criação — sem id
export const CriarUsuarioSchema = z.object({
  nome: z.string().min(3, "Nome deve conter no minímo 3 caracteres"),
  email: z.email("Email inválido"),
  senha: z.string().min(6, "Senha deve conter no minímo 6 caracteres"),
  funcao: z.enum(usuario_funcao, "Função inválida")
})

export type CriarUsuarioDTO = z.infer<typeof CriarUsuarioSchema>



export const JWTPayloadSchema = z.object({
  id: z.uuid("ID do usuário inválido"),
  email: z.email("Email do usuário no token"),
  iat: z.number().optional(),
  exp: z.number().optional()
})

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export const AtualizarUsuarioSchema = CriarUsuarioSchema.partial();
export type AtualizarUsuarioDTO = z.infer<typeof AtualizarUsuarioSchema>
