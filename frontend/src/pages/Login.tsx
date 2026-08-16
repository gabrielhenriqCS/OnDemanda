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
    <div className="p-8 rounded-2xl shadow-sm border border-zinc-300 w-full max-w-md bg-blend-luminosity">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">OnComanda</h1>
        <p className="text-zinc-700 text-sm mt-1">Acessar o sistema de gestão</p>
      </div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="text-[21px] my-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="px-3 py-2 w-sm bg-white rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha" className="text-[21px] my-2">
          Senha
        </label>
        <input
          type="password"
          id="senha"
          className="px-3 w-sm py-2 rounded-md bg-white"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className="flex flex-row items-center mt-2 gap-2">
          <input
            type="checkbox"
            id="lembrarSenha"
            checked={lembrarSenha}
            onChange={(e) => setLembrarSenha(e.target.checked)}
            className="w-4 h-4 accent-blue-500 border-5"
          />
          <p className="text-[16px] font-semibold">Lembrar-me</p>
        </div>

        <button
          type="submit"
          className="mt-10 py-2 px-0.5 bg-blue-700 text-white rounded-md hover:bg-blue-500 cursor-pointer"
        >
          Entrar
        </button>
        {erro && (
          <p className="bg-red-500 text-white p-2 rounded-md mt-3 text-center">
            {erro}
          </p>
        )}
      </form>
    </div>
  );
}
