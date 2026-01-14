import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ CONECTADO AO MYSQL COM SUCESSO!');
    } catch (error) {
      console.error('❌ ERRO AO CONECTAR:', error.message);
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
