export interface CreateComanda {
    cliente?: string;
    mesaId: number;
}

export interface UpdateStatusComanda {
    status?: 'ABERTA' | 'FECHADA'
}

export interface ComandaDTO {
  id: number;
  cliente?: string;
  mesaId: number;
  status: 'ABERTA' | 'FECHADA';
  abertoEm: string;
  atualizadoEm: string;
}