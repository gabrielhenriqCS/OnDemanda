import { prisma } from "../helpers/prisma";
import { AtualizarMesaDTO, CriarMesaDTO } from "../schemas/Mesas";

export class MesaService {
  async listarTodasAsMesas() {
    return await prisma.mesa.findMany({
      include: {
        comandas: {
          where: { status: "ABERTA" },
          take: 1,
          select: { id: true, createdAt: true },
        },
      },
      orderBy: { mesa: "asc" },
    });
  }

  async criarMesa(dados: CriarMesaDTO) {
    const mesaExiste = await prisma.mesa.findUnique({
      where: {
        mesa: dados.mesa,
      },
    });

    if (mesaExiste) {
      throw new Error("Já existe uma mesa cadastrada com este número.");
    }

    return await prisma.mesa.create({
      data: {
        numero: dados.mesa,
        cliente: dados.cliente || null,
        status: "LIVRE",
      } as any,
    });
  }

  async alterarMesa(id: number, dados: AtualizarMesaDTO) {
    const mesa = await prisma.mesa.findUnique({
      where: {
        id: id,
      },
    });

    if (!mesa) {
      throw new Error("Mesa já encontrada.");
    }

    return await prisma.mesa.update({
      where: { id },
      data: dados,
    });
  }
}
