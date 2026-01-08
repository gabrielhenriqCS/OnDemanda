import { Module } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { ComandaController } from './comanda.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ComandaRepository } from './comanda.repository';

@Module({
  controllers: [ComandaController],
  providers: [ComandaService, ComandaRepository],
})
export class ComandaModule {}
