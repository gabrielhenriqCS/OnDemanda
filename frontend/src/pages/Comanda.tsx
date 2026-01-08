import { useEffect, useState } from "react";
import { ComandaService } from "../services/comandaService";
import type { ComandaDTO } from "../@types";

export default function Comanda() {
  const [comandas, setComandas] = useState<ComandaDTO[]>([]);

  useEffect(() => {
    async function carregarMesas() {
      try {
        const { data } = await ComandaService.mostrarComandas();
        setComandas(data);
      } catch (error) {
        console.error("Erro ao carregar mesas:", error);
      }
    }
    carregarMesas();
  }, []);
  return (
    <section className="flex flex-col items-center mt-10">
      <h1 className="text-[30px]">Comanda</h1>
      <input type="text" placeholder="Pesquise com o n° da mesa..." className="m-5 p-3 w-[55rem] bg-gray-300 text-[20px] rounded-lg"/>

      <h2 className="text-[20px] mt-2">Mesas livres</h2>
        <div className="">
              {comandas.length === 0 ? (
                  <p>Nenhuma comanda encontrada</p>
              ) : (
                      comandas.map((comanda) => (
                          <div key={comanda.id}>
                              Mesa: {comanda.mesaId} - Status: {comanda.status}
                          </div>
                      ))
              )}
        </div>
    </section>
  );
}
