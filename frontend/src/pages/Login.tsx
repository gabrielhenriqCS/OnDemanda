import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

export default function Login() {
  const [funcao, setFuncao] = useState("garcom");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, senha, funcao });

      if (lembrarSenha) {
        localStorage.setItem(
          "dadosLogin",
          JSON.stringify({ email, senha, funcao })
        );
      }

      if (data.funcao.toLowerCase() !== funcao.toLowerCase()) {
        setErro("Função selecionada não corresponde ao usuário.");
        return;
      }

      localStorage.setItem("token", data.token_acesso);

      if (data.funcao === "admin") navigate("/admin/dashboard");
      if (data.funcao === "garcom") navigate("/comanda");
      if (data.funcao === "cozinha") navigate("/cozinha");
    } catch (e: unknown) {
      console.error("Erro nas credenciais ao fazer login: ", e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blend-luminosity">
      <h1 className="text-4xl text-center mb-5">OnComanda</h1>
      <form
        className="flex flex-col px-24 py-32 bg-blue-300 rounded-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="funcao" className="text-[21px] my-2">
          Função
        </label>
        <select
          id="selectFuncao"
          className="px-3 py-2 w-sm text-md rounded-md bg-white"
          value={funcao}
          onChange={(e) => setFuncao(e.target.value)}
        >
          <option value="garcom">Garçom</option>
          <option value="cozinha">Cozinha</option>
          <option value="admin">Administrador</option>
        </select>
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
          />
          <p>Lembrar-me</p>
        </div>

        <button
          type="submit"
          className="mt-12 py-2 px-0.5 bg-blue-700 text-white rounded-md hover:bg-blue-500 cursor-pointer"
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
