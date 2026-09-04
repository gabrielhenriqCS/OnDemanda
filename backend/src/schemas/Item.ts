import { z } from 'zod';

export const criarItemSchema = z.object({
  nome: z.string().min(2, 'O nome do produto deve ter pelo menos 2 caracteres'),
  descricao: z.string().optional(),
  preco: z.number().positive('O preço deve ser maior que zero'),
  ativo: z.boolean().default(true),
});

export const atualizarItemSchema = criarItemSchema.partial();

export type CriarItemDTO = z.infer<typeof criarItemSchema>;
export type AtualizarItemDTO = z.infer<typeof atualizarItemSchema>;