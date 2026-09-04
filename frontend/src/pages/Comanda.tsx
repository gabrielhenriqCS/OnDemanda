import { useEffect, useState } from "react";
import { ComandaService } from "../services/comandaService";
import type { MesaDTO } from "../@types";
import MesasCards from "../components/MesasCards";
import DetalhesComanda from "../components/DetalhesComanda";

export default function Comanda() {
  const [mesas, setMesas] = useState<MesaDTO[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mesaSelecionada, setMesaSelecionada] = useState<MesaDTO | null>(null)

  useEffect(() => {
    async function carregarMesas() {
      try {
        const { data } = await ComandaService.mostrarComandas();
        setMesas(data);
      } catch (error) {
        console.error("Erro ao carregar comandas/mesas:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarMesas();
  }, []);

  const mesasFiltradas = mesas.filter((m) => {
    const termo = busca.toLowerCase();
    const numeroMesa = String(m.mesa);
    const nomeCliente = m.cliente?.toLowerCase() || "";

    return numeroMesa.includes(termo) || nomeCliente.includes(termo);
  });

  return (
    <section className="flex flex-col items-center mt-10">
      <span className="text-[30px]">Comanda</span>
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquise com o n° da mesa..."
        className="m-5 p-3 w-[55rem] border border-zinc-300  bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />

      {carregando ? (
        <p>Carregando mesas...</p>
      ) : mesasFiltradas.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-lg font-bold text-zinc-700">
            Nenhuma mesa ou comanda encontrada!
          </p>
          <p className="text-sm text-zinc-500">
            Tente buscar por outro número de mesa.
          </p>
        </div>
      ) : (
            <MesasCards mesas={mesasFiltradas} onSelectMesa={(mesa) => setMesaSelecionada(mesa)} />
            
      )}
      <DetalhesComanda mesa={mesaSelecionada} onClose={() => setMesaSelecionada(null)}/>
    </section>
  );
}
