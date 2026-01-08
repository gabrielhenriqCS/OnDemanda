import { Module, ValidationPipe } from '@nestjs/common';
import { ProdutoModule } from './produtos/produto.module'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { MesasModule } from './mesas/mesas.module';
import { ComandaModule } from './comanda/comanda.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProdutoModule, PrismaModule, AuthModule, MesasModule, ComandaModule, PedidosModule,
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
