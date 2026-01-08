import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';

@Module({
  providers: [ProdutoService, ProdutoRepository],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
