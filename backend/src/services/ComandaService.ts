import { prisma } from "../helpers/prisma";
import { CriarComandaDTO } from "../schemas";



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
                            }
                        }
                    }
                }
            }
        })
    }

    async abrirComanda(data: CriarComandaDTO) {
        const mesa = await prisma.mesa.findUnique({
            where: { id: data.mesaId }
        });

        if (!mesa) {
            throw new Error("Mesa não existente.")
        }

        if (mesa.status === "OCUPADA") {
            throw new Error("Mesa já ocupada.")
        }

        return await prisma.$transaction(async (prisma) => {
            const comanda = await prisma.comanda.create({
                data: {
                    mesaId: data.mesaId,
                    status: "ABERTA"
                }
            })

            await prisma.mesa.update({
                where: {
                    id: data.mesaId
                },
                data: {
                    status: "OCUPADA",
                    cliente: data.cliente || null
                }
            })
            return comanda;
        })
    }

    async fecharComanda(comandaId: string) {
        const comanda = await prisma.comanda.findUnique({
            where: { id: comandaId },
            include: {
                pedido: {
                    where: {status: "ENTREGUE"}
                }
            }
        })
    }
}