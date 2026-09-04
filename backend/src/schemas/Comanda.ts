import z from "zod";


export const StatusComandaEnum = z.object(['ABERTA', 'FECHADA']);

export const ComandaSchema = z.object({
    mesaId: z.string(),
    cliente: z.string().optional(),
});

export const atualizarStatusComandaSchema = z.object({
  status: StatusComandaEnum,
});

export type CriarComandaDTO = z.infer<typeof ComandaSchema>;
export type AtualizarStatusComandaDTO = z.infer<typeof atualizarStatusComandaSchema>;