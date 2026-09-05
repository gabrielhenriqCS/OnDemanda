import z from "zod";

export const StatusComandaEnum = z.enum(["ABERTA", "FECHADA"]);

export const ComandaSchema = z.object({
  mesaId: z.number().int().positive(),
  cliente: z.string().optional(),
});

export const atualizarStatusComandaSchema = z.object({
  status: StatusComandaEnum,
});

export type CriarComandaDTO = z.infer<typeof ComandaSchema>;
export type AtualizarStatusComandaDTO = z.infer<
  typeof atualizarStatusComandaSchema
>;
