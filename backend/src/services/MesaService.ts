import { prisma } from "../helpers/prisma";


export class MesaService {
    async listarTodasAsMesas() {
        return await prisma.mesa.findMany()
    }
}