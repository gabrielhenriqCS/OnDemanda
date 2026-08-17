import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [erro,] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, senha });

      localStorage.setItem("token", data.token_acesso);

      if (data.funcao === "admin") navigate("/admin/dashboard");
      if (data.funcao === "garcom") navigate("/comanda");
      if (data.funcao === "cozinha") navigate("/cozinha");
    } catch (e: unknown) {
      console.error("Erro nas credenciais ao fazer login: ", e);
    }
  };
  return (
    <div className="flex flex-col h-[800px] items-center justify-center bg-blend-luminosity p-8 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-zinc-800">OnComanda</h1>
        <p className="text-zinc-700 text-sm mt-1">Acessar o sistema de gestão</p>
      </div>
      <form
        className="space-y-4 flex flex-col px-22 py-30 bg-blue-300 rounded-md"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-zinc-800 mb-1">
          E-mail
        </label>
        <input
          type="email"
            id="email"
            placeholder="email@exemplo.com"
            className="px-3 py-2 w-sm bg-white rounded-md border border-gray-300
          focus:outline-none focus:ring-1 focus:ring-zinc-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div>
          <label htmlFor="senha" className="block text-lg font-medium text-zinc-800 mb-1">
          Senha
        </label>
        <input
          type="password"
            id="senha"
            placeholder="********"
          className="px-3 w-sm py-2 rounded-md bg-white border-gray-300
          focus:outline-none focus:ring-1 focus:ring-zinc-500"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="lembrarSenha"
            checked={lembrarSenha}
            onChange={(e) => setLembrarSenha(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
          />
          <p className="ml-2 block text-sm text-zinc-500">Lembrar-me</p>
        </div>

        {erro && (
          <p className="hidden text-red-600 bg-red-200 text-sm py-2">
            {erro}
          </p>
        )}
        <button
          type="submit"
          className="w-full font-medium  py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-500 cursor-pointer"
        >
          Entrar
        </button>
        
      </form>
    </div>
  );
}
