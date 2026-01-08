import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function criarAdmin() {
  const existe = await prisma.usuario.findUnique({
    where: { email: 'admin@admin.com' },
  });

  if (existe) {
    console.log('Admin já existe.');
    return;
  }

  const senhaHash = await bcrypt.hash('admin123', 10);

  await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha: senhaHash,
      funcao: 'ADMIN',
    },
  });

  console.log('Admin criado com sucesso! Email: admin@admin.com | Senha: admin123');
}

criarAdmin()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
