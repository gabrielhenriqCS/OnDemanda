
import z from "zod";


export const CriarMesaSchema = z.object({
    mesa: z.string().min(2),
    cliente: z.string("A mesa deve ser identificada pelo cliente"),
})

export type CriarMesaDTO = z.infer<typeof CriarMesaSchema>

export const AtualizarMesaSchema = z.object({
    status: z.enum(['LIVRE', 'OCUPADA']),
    cliente: z.string().nullable().optional()
})
export type AtualizarMesaDTO = z.infer<typeof AtualizarMesaSchema>