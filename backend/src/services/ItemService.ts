import { prisma } from "../helpers/prisma";
import { CriarItemDTO } from "../schemas";


export class itemService {
  async listarTodosOsItens() {
    return await prisma.item.findMany({
      orderBy: { nome: "asc" },
    });
  }

  async criarItem(data: CriarItemDTO) {
    return await prisma.item.create({
      data: {
        nome: data.nome,
        descricao: data.descricao || null,
        preco: data.preco,
        ativo: data.ativo ?? true,
      },
    });
    }
    
    async atualizarItem(id: number, data: CriarItemDTO) {
        return await prisma.item.update({
            where: { id },
            data,
        })
    }

    async inativarItem(id: number) {
        return await prisma.item.update({
            where: { id },
            data: {
                ativo: false,
            }
        })
    }
}
