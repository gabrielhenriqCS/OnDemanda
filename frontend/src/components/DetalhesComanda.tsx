

import type { PedidoDTO } from '../@types/Pedido';
import type { MesaDTO } from './../@types/Mesa';

interface DetalhesComandaProps {
    mesa: MesaDTO | null
    onClose?: () => void
}

function formatarDataPedido(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(data));
}

export default function DetalhesComanda({mesa, onClose}: DetalhesComandaProps) {
    if (!mesa) return null
    const pedidosMock: PedidoDTO[] = [
    {
      id: 1,
      status: "ENTREGUE",
      createdAt: "2026-09-05T19:35:00",
      itens: [
        { id: 101, quantidade: 2, precoUnitario: 12.5, item: { nome: "Chopp 500ml" } },
        { id: 102, quantidade: 1, precoUnitario: 38.0, item: { nome: "Hambúrguer Artesanal" }, observacao: "Sem cebola" }
      ]
    },
    {
      id: 2,
      status: "EM_PREPARO",
      createdAt: "2026-09-05T20:05:00",
      itens: [
        { id: 103, quantidade: 1, precoUnitario: 25.0, item: { nome: "Porção de Batata Frita" } }
      ]
    }
    ];
    
    const totalComanda = mesa.comandaAtiva?.total || 50.0

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-zinc-900 text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Mesa {String(mesa.mesa).padStart(2, "0")}
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500 text-zinc-900 uppercase">
                {mesa.status}
              </span>
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">
              Cliente: {mesa.cliente || "Não informado"}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white text-2xl font-bold leading-none p-1"
          >
            &times;
          </button>
        </div>

        
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-zinc-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Histórico de Pedidos
          </h3>

          {pedidosMock.map((pedido) => (
            <div key={pedido.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-400">
                  Pedido #{pedido.id} • {formatarDataPedido(pedido.createdAt)}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  pedido.status === 'ENTREGUE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {pedido.status}
                </span>
              </div>

              <ul className="space-y-1.5">
                {pedido.itens.map((subItem) => (
                  <li key={subItem.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium text-zinc-800">{subItem.quantidade}x </span>
                      <span className="text-zinc-700">{subItem.item.nome}</span>
                      {subItem.observacao && (
                        <p className="text-xs text-zinc-400 italic">Obs: {subItem.observacao}</p>
                      )}
                    </div>
                    <span className="font-semibold text-zinc-700">
                      R$ {(subItem.quantidade * subItem.precoUnitario).toFixed(2).replace('.', ',')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <div className="bg-zinc-50 border-t border-zinc-200 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center text-zinc-900">
            <span className="font-medium">Total Consumido:</span>
            <span className="text-2xl font-bold text-amber-600">
              R$ {totalComanda.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 bg-zinc-200 text-zinc-700 rounded-lg font-semibold hover:bg-zinc-300 transition-colors"
            >
              Fechar
            </button>
            <button 
              className="flex-1 py-2.5 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              + Novo Pedido
            </button>
          </div>
        </div>

      </div>
    </div>
    )
}