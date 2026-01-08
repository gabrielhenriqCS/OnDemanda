import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDTO } from './DTOs/create-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { UpdateProdutoDTO } from './DTOs/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepo: ProdutoRepository) {}

  criarProduto(data: CreateProdutoDTO) {
    return this.produtoRepo.create(data);
  }

  listarProdutos() {
    return this.produtoRepo.findAll();
  }

  async encontrarProdutoPorId(id: number) {
    const produto = await this.produtoRepo.findOne(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async atualizarProduto(id: number, data: UpdateProdutoDTO) {
    await this.encontrarProdutoPorId(id);
    return this.produtoRepo.update(id, data);
  }

  async deletarProduto(id: number) {
    await this.encontrarProdutoPorId(id);
    return this.produtoRepo.delete(id);
  }
}
