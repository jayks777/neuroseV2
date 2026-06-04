import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../api/authServices";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await loginService(email, password);
      await login();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d10] flex items-center justify-center font-sans">
      <div className="w-full max-w-sm bg-[#111118] border border-[#1e1e2c] rounded-2xl p-10">

        {/* Logo */}
        <p className="font-display text-[#a78bfa] text-lg font-semibold tracking-wide mb-8">
          ◆ workspace
        </p>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-[#f1f0f6] mb-1">
          Entrar na conta
        </h1>
        <p className="text-sm text-[#6b6b80] mb-7">Bem-vindo de volta</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#6b6b80] mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d0d10] border border-[#1e1e2c] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e8] placeholder-[#3a3a50] outline-none focus:border-[#7c3aed] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#6b6b80] mb-1.5">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d0d10] border border-[#1e1e2c] rounded-lg px-3.5 py-2.5 text-sm text-[#e2e2e8] placeholder-[#3a3a50] outline-none focus:border-[#7c3aed] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg py-3 text-sm font-medium mt-1 transition-colors"
          >
            Entrar
          </button>

        </form>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-[#1a0f1f] border border-[#3b1f4e] rounded-lg px-3.5 py-2.5 mt-4 text-sm text-[#c4b5fd]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e2c] my-6" />

        <p className="text-center text-sm text-[#4e4e68]">
          Não tem uma conta?{" "}
          <a href="/register" className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
            Criar conta
          </a>
        </p>

      </div>
    </div>
  );
}
