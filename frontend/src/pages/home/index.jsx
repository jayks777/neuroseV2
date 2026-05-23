import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Ana Paula Ferreira", email: "ana.ferreira@empresa.com", role: "Administradora", department: "TI", status: "ativo", avatar: "AP", joined: "2022-03-14", lastActive: "há 2 min" },
  { id: 2, name: "Bruno Carvalho", email: "b.carvalho@empresa.com", role: "Desenvolvedor", department: "Engenharia", status: "ativo", avatar: "BC", joined: "2021-08-07", lastActive: "há 1 hora" },
  { id: 3, name: "Camila Rodrigues", email: "c.rodrigues@empresa.com", role: "Designer", department: "Produto", status: "ativo", avatar: "CR", joined: "2023-01-22", lastActive: "há 3 horas" },
  { id: 4, name: "Diego Mendes", email: "d.mendes@empresa.com", role: "Analista", department: "Dados", status: "inativo", avatar: "DM", joined: "2020-11-05", lastActive: "há 2 dias" },
  { id: 5, name: "Elisa Teixeira", email: "e.teixeira@empresa.com", role: "Gerente", department: "Produto", status: "ativo", avatar: "ET", joined: "2019-06-18", lastActive: "agora" },
  { id: 6, name: "Felipe Souza", email: "f.souza@empresa.com", role: "Desenvolvedor", department: "Engenharia", status: "pendente", avatar: "FS", joined: "2024-02-01", lastActive: "há 5 dias" },
  { id: 7, name: "Gabriela Lima", email: "g.lima@empresa.com", role: "Analista", department: "Marketing", status: "ativo", avatar: "GL", joined: "2022-09-30", lastActive: "há 20 min" },
  { id: 8, name: "Hugo Alves", email: "h.alves@empresa.com", role: "Suporte", department: "CS", status: "inativo", avatar: "HA", joined: "2021-04-12", lastActive: "há 1 semana" },
];

const avatarColors = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-indigo-100 text-indigo-700",
];

const statusConfig = {
  ativo: { label: "Ativo", class: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  inativo: { label: "Inativo", class: "bg-slate-100 text-slate-500 ring-1 ring-slate-200" },
  pendente: { label: "Pendente", class: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
};

const departmentColors = {
  TI: "bg-violet-50 text-violet-700",
  Engenharia: "bg-sky-50 text-sky-700",
  Produto: "bg-teal-50 text-teal-700",
  Dados: "bg-indigo-50 text-indigo-700",
  Marketing: "bg-rose-50 text-rose-700",
  CS: "bg-amber-50 text-amber-700",
};

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDept, setFilterDept] = useState("todos");
  const [sortBy, setSortBy] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 900);
  }, []);

  const departments = ["todos", ...new Set(mockUsers.map((u) => u.department))];

  const filtered = users
    .filter((u) => {
      const q = search.toLowerCase();
      return (
        (u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)) &&
        (filterStatus === "todos" || u.status === filterStatus) &&
        (filterDept === "todos" || u.department === filterDept)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "joined") return new Date(b.joined) - new Date(a.joined);
      if (sortBy === "role") return a.role.localeCompare(b.role);
      return 0;
    });

  const stats = {
    total: users.length,
    ativos: users.filter((u) => u.status === "ativo").length,
    inativos: users.filter((u) => u.status === "inativo").length,
    pendentes: users.filter((u) => u.status === "pendente").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 leading-none">Gestão de Usuários</h1>
              <p className="text-xs text-slate-400 mt-0.5">Painel administrativo</p>
            </div>
          </div>
          <Link  to="/test" className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all text-white text-sm font-medium px-4 py-2 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Novo Usuário
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "text-violet-600 bg-violet-50" },
            { label: "Ativos", value: stats.ativos, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-emerald-600 bg-emerald-50" },
            { label: "Inativos", value: stats.inativos, icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "text-slate-500 bg-slate-100" },
            { label: "Pendentes", value: stats.pendentes, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-amber-600 bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none">{loading ? "—" : stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome, email ou cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-600 cursor-pointer"
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="pendente">Pendente</option>
            </select>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-600 cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d === "todos" ? "Todos os departs." : d}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-600 cursor-pointer"
            >
              <option value="name">Ordenar: Nome</option>
              <option value="joined">Ordenar: Entrada</option>
              <option value="role">Ordenar: Cargo</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <div className="col-span-4">Usuário</div>
            <div className="col-span-2 hidden md:block">Cargo</div>
            <div className="col-span-2 hidden md:block">Departamento</div>
            <div className="col-span-2 hidden md:block">Último acesso</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-0 divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-center animate-pulse">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-slate-200 rounded w-32" />
                      <div className="h-2.5 bg-slate-100 rounded w-44" />
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:block h-3 bg-slate-100 rounded w-20" />
                  <div className="col-span-2 hidden md:block h-5 bg-slate-100 rounded-full w-16" />
                  <div className="col-span-2 hidden md:block h-3 bg-slate-100 rounded w-16" />
                  <div className="col-span-2 h-5 bg-slate-100 rounded-full w-14" />
                </div>
              ))}
            </div>
          )}

          {/* User Rows */}
          {!loading && (
            <div className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <svg className="mx-auto w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-slate-400 text-sm">Nenhum usuário encontrado</p>
                </div>
              ) : (
                filtered.map((user, idx) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                    className={`grid grid-cols-12 gap-4 px-5 py-4 items-center cursor-pointer transition-colors ${selectedUser?.id === user.id ? "bg-violet-50" : "hover:bg-slate-50"}`}
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <span className="text-sm text-slate-600">{user.role}</span>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${departmentColors[user.department] ?? "bg-slate-100 text-slate-500"}`}>
                        {user.department}
                      </span>
                    </div>
                    <div className="col-span-2 hidden md:block">
                      <span className="text-xs text-slate-400">{user.lastActive}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[user.status].class}`}>
                        {statusConfig[user.status].label}
                      </span>
                      <button className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors ml-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                        </svg>
                      </button>
                    </div>

                    {/* Expanded Row */}
                    {selectedUser?.id === user.id && (
                      <div className="col-span-12 mt-2 pt-3 border-t border-violet-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Email", value: user.email },
                          { label: "Departamento", value: user.department },
                          { label: "Cargo", value: user.role },
                          { label: "Membro desde", value: new Date(user.joined).toLocaleDateString("pt-BR") },
                        ].map((field) => (
                          <div key={field.label}>
                            <p className="text-xs text-slate-400 mb-0.5">{field.label}</p>
                            <p className="text-sm text-slate-700 font-medium">{field.value}</p>
                          </div>
                        ))}
                        <div className="col-span-2 md:col-span-4 flex gap-2 mt-1">
                          <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                            Editar usuário
                          </button>
                          <button className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
                            Redefinir senha
                          </button>
                          <button className="text-xs font-medium px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors ml-auto">
                            Desativar conta
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Mostrando <span className="font-medium text-slate-600">{filtered.length}</span> de <span className="font-medium text-slate-600">{users.length}</span> usuários
              </p>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <button key={p} className={`w-7 h-7 text-xs rounded-md transition-colors ${p === 1 ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-200"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}