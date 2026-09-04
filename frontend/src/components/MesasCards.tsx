import type { MesaDTO } from "../@types";

interface MesasCardsProps {
  mesas: MesaDTO[];
  onSelectMesa?: (mesa: MesaDTO) => void;
}

export default function MesasCards({ mesas, onSelectMesa }: MesasCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {mesas.map((item) => {
        const isOcupada = item.status === "OCUPADA";
        return (
          <div
            key={item.id}
            onClick={() => onSelectMesa?.(item)}
            className={`py-6 px-8 rounded-xl border shadow-sm hover:border-zinc-400 cursor-pointer transition-colors relative ${isOcupada ? "bg-amber-50/50 border-amber-200 hover:border-amber-400" : "bg-emerald-100 border-zinc-200 hover:border-zinc-400"}`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl font-bold">
                {String(item.mesa).padStart(2, "0")}
              </span>
              <span
                className={`px-3 py-1 ml-6 text-[10px] font-bold uppercase rounded-full bg-amber-500 text-white ${isOcupada ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}
              >
                {item.status}
              </span>
            </div>
            <div className="text-zinc-500 text-sm">
              {isOcupada ? (
                <>
                  {item.cliente && (
                    <p className="font-medium text-zinc-900 truncate">
                      {item.cliente}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500">
                    {item.comandaAtiva?.abertoEm || "19:30"}
                  </p>
                  <p className="font-bold text-zinc-900 mt-1">
                    R$
                    {(item.comandaAtiva?.total || 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </>
              ) : (
                <p className="italic text-zinc-400 text-xs">Mesa disponível</p>
              )}
            </div>
          </div>
        );
      })}
      {/* <div className="bg-sky-100 py-6 px-8 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-400 cursor-pointer transition-colors relative">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-bold">01</span>
                    <span className="px-3 py-1 ml-6 text-[10px] font-bold uppercase rounded-full bg-amber-500 text-white">Ocupada</span>
                </div>
                <div className="text-zinc-500 text-sm">
                    <p><i className="mr-1"></i> Aberta às 19:30</p>
                    <p><i className="mr-1"></i> R$ 145,90</p>
                </div>
            </div>
            <div className="bg-sky-100 py-6 px-8 rounded-xl border border-zinc-200 shadow-sm hover:border-zinc-400 cursor-pointer transition-colors relative">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-bold">02</span>
                    <span className="px-3 py-1 ml-6 text-[10px] font-bold uppercase rounded-full bg-emerald-500 text-gray-100 border border-zinc-200">Livre</span>
                </div>
                <div className="text-zinc-500 text-sm italic">
                    Nenhum consumo
                </div>
            </div> */}
    </div>
  );
}
