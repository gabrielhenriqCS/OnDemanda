export interface ItemPedidoDTO {
  id: number;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
  item: {
    nome: string;
  };
}

export interface PedidoDTO {
  id: number;
  status: 'PENDENTE' | 'EM_PREPARO' | 'ENTREGUE' | 'CANCELADO';
  createdAt: string;
  itens: ItemPedidoDTO[];
}

export interface DetalhesComandaDTO {
  id: number;
  cliente?: string;
  mesa: number;
  status: 'ABERTA' | 'FECHADA';
  total: number;
  pedidos: PedidoDTO[];
}