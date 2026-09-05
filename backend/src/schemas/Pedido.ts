import z from "zod";

export const StatusPedidoEnum = z.enum([
  "PREPARANDO",
  "PRONTO",
  "ENTREGUE",
  "CANCELADO",
]);

const itemPedidoSchema = z.object({
  itemId: z.number("O ID do produto é obrigatório").int().positive(),
  quantidade: z.number().int().min(1, "A quantidade deve ser no mínimo 1"),
  observacao: z.string().optional(),
});

export const criarPedidoSchema = z.object({
  comandaId: z.number("O ID da comanda é obrigatório").int().positive(),
  itens: z
    .array(itemPedidoSchema)
    .min(1, "O pedido deve conter pelo menos 1 item"),
});

export const atualizarStatusPedidoSchema = z.object({
  status: StatusPedidoEnum,
});

export type CriarPedidoDTO = z.infer<typeof criarPedidoSchema>;
export type AtualizarStatusPedidoDTO = z.infer<
  typeof atualizarStatusPedidoSchema
>;
