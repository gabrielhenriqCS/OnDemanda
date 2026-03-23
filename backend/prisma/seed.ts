import prisma from "../src/lib/prisma";


async function main() {
    const user = await prisma.usuario.create({
        data: {
            nome: "Gabriel Admin",
            email: "gabrielhenrique@yahoo.com",
            senha: "Gh2004",
            funcao: "ADMIN"
        },
    })
    console.log("Usuário criado:", user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })