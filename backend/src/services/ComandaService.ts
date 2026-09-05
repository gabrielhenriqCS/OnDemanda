import { prisma } from "../helpers/prisma";
import { CriarComandaDTO, StatusComandaEnum } from "../schemas";

export class ComandaService {
  async listarAbertas() {
    return await prisma.comanda.findMany({
      where: { status: "ABERTA" },
      include: {
        mesa: true,
        pedidos: {
          include: {
            itens: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });
  }

  async abrirComanda(data: CriarComandaDTO) {
    const mesa = await prisma.mesa.findUnique({
      where: { id: data.mesaId },
    });

    if (!mesa) {
      throw new Error("Mesa não existente.");
    }

    if (mesa.status === "OCUPADA") {
      throw new Error("Mesa já ocupada.");
    }

    return await prisma.$transaction(async (prisma) => {
      const comanda = await prisma.comanda.create({
        data: {
          mesaId: data.mesaId,
          status: "ABERTA",
        },
      });

      await prisma.mesa.update({
        where: {
          id: data.mesaId,
        },
        data: {
          status: "OCUPADA",
          cliente: data.cliente || null,
        },
      });
      return comanda;
    });
  }

  async fecharComanda(comandaId: number) {
    const comanda = await prisma.comanda.findUnique({
      where: { id: comandaId },
      include: {
        pedidos: {
          where: {
            status: {
              not: "CANCELADO",
            },
          },
        },
      },
    });

    if (!comanda) throw new Error("Comanda não encontrada.");
    if (comanda.status === "FECHADA")
      throw new Error("Comanda já está fechada.");

    return await prisma.$transaction(async (prisma) => {
      const comandaAtualizada = await prisma.comanda.update({
        where: { id: comandaId },
        data: { status: "FECHADA" },
      });

      await prisma.mesa.update({
        where: { id: comanda.mesaId },
        data: { status: "LIVRE", cliente: null },
      });

      return comandaAtualizada;
    });
  }
}
