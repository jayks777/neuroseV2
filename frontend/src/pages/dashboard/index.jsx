import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import api from "../../api/requests";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await api.getData("/auth/me");
        setUser(data);
      } catch {
        console.log("Erro ao carregar usuário");
      }
    }
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2e8] font-sans">

      {/* Topbar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#1e1e2e]">
        <span className="font-display text-[#a78bfa] text-lg font-semibold tracking-wide">
          ◆ workspace
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#6b6b80]">Área pessoal</span>
          <div className="w-px h-4 bg-[#1e1e2c]" />
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-sm font-semibold text-white">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-8 py-10">

        {/* Welcome Row */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-[#7c3aed] bg-[#1e1230] border border-[#2d1b4e] px-3 py-1 rounded-full inline-block mb-3">
              Painel
            </span>
            <h1 className="text-3xl font-semibold text-[#f1f0f6] leading-tight">
              Bem-vindo,{" "}
              <span className="text-[#a78bfa]">{user?.name ?? "..."}</span>
            </h1>
            <p className="text-sm text-[#6b6b80] mt-1">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-transparent border border-[#2a1f3d] text-[#9986c5] px-4 py-2 rounded-lg text-sm transition-all hover:bg-[#1a1228] hover:border-[#7c3aed] hover:text-[#c4b5fd]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Sessões", value: "24", badge: "este mês", badgeStyle: "purple" },
            { label: "Status", value: "Ativo", badge: "online", badgeStyle: "green" },
            { label: "Conta", value: "Pro", badge: "plano atual", badgeStyle: "purple" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111118] border border-[#1e1e2c] rounded-xl p-5">
              <p className="text-xs text-[#6b6b80] uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-2xl font-semibold text-[#e2e2ee]">{stat.value}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block border ${
                stat.badgeStyle === "green"
                  ? "bg-[#0e1e18] text-[#6ee7b7] border-[#134032]"
                  : "bg-[#1e1230] text-[#a78bfa] border-[#2d1b4e]"
              }`}>
                {stat.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Activity */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9986c5] mb-4">
          Atividade recente
        </p>
        <div className="bg-[#111118] border border-[#1e1e2c] rounded-xl overflow-hidden">
          {[
            { text: "Login realizado com sucesso", time: "agora", active: true },
            { text: "Perfil atualizado", time: "2h atrás", active: false },
            { text: "Configurações salvas", time: "ontem", active: false },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center gap-3 px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-[#16161f]" : ""}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.active ? "bg-[#7c3aed]" : "bg-[#3a3a50]"}`} />
              <span className="flex-1 text-sm text-[#c4c4d4]">{item.text}</span>
              <span className="text-xs text-[#4e4e68]">{item.time}</span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}