export interface MesaDTO {
  id: number;
  mesa: number;
  status: 'LIVRE' | 'OCUPADA';
  cliente?: string;
  comandaAtiva?: {
    id: number;
    total: number;
    abertoEm: string;
  };
}