import { Module, ValidationPipe } from '@nestjs/common';
import { ProdutoModule } from './produtos/produto.module';
import { AuthModule } from './auth/auth.module';
import { MesasModule } from './mesas/mesas.module';
import { ComandaModule } from './comanda/comanda.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProdutoModule,
    PrismaModule,
    AuthModule,
    MesasModule,
    ComandaModule,
    PedidosModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
