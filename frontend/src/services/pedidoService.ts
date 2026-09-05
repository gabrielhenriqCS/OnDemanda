import type { PedidoDTO } from "../@types";
import api from "./api";

export const pedidosService = {
  mostrarPendentes: () => api.get("/pedidos"),
  abrirPedido: (data: PedidoDTO) => api.post("/pedidos/criar", data),
  buscarPedido: (pedidoId: number) => api.get(`/pedidos/${pedidoId}`),
  atualizarStatus: (id: number, data: PedidoDTO) =>
    api.patch(`/pedidos/${id}/status`, data),
};
