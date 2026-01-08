import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';

@Global()
  @Module({
  imports: [ConfigModule],
  providers: [PrismaService, PrismaClient],
  exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
