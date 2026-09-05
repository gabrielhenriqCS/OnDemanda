import { AtualizarStatusPedidoDTO, CriarPedidoDTO } from "../schemas";
import { prisma } from "../helpers/prisma";

export class PedidoService {
  async criarPedido(usuarioId: number, data: CriarPedidoDTO) {
    const comanda = await prisma.comanda.findUnique({
      where: { id: data.comandaId },
    });

    if (!comanda || comanda.status !== "ABERTA") {
      throw new Error("Comanda não encontrada ou não está aberta.");
    }

    const itensComPrecoCongelado = await Promise.all(
      data.itens.map(async (item) => {
        const itemBanco = await prisma.item.findUnique({
          where: { id: item.itemId },
        });

        if (!itemBanco) {
          throw new Error(`Item com ID ${item.itemId} não encontrado.`);
        }

        return {
          itemId: itemBanco.id,
          quantidade: item.quantidade,
          precoUnitario: itemBanco.preco,
          observacao: item.observacao,
        };
      }),
    );

    return await prisma.pedido.create({
      data: {
        comandaId: data.comandaId,
        usuarioId,
        status: "PREPARANDO",
        itens: {
          createMany: {
            data: itensComPrecoCongelado,
          },
        },
      },
      include: {
        itens: {
          include: {
            item: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async atualizarStatus(pedidoId: number, data: AtualizarStatusPedidoDTO) {
    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }

    return await prisma.pedido.update({
      where: {
        id: pedidoId,
      },
      data: {
        status: data.status,
      },
    });
  }
}
