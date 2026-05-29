import { useState, useEffect } from "react";
import { getData, postData, putData, deleteData } from "../../api/requests";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
];

function Avatar({ name, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-xs font-semibold text-white shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

export default function UserTable() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const data = await getData("/user/");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  async function openAdd() {
    setForm({ name: "", email: "" });
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(user) {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
    setShowModal(true);
  }

  function saveUser() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId !== null) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editId ? { ...u, ...form } : u)),
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), name: form.name, email: form.email },
      ]);
    }
    setShowModal(false);
  }

  async function saveUser() {
    if (!form.name.trim() || !form.email.trim()) return;

    try {
      if (editId !== null) {
        // UPDATE
        const updatedUser = await putData(`/user/update/${editId}`, form);

        setUsers((prev) =>
          prev.map((u) => (u.id === editId ? updatedUser : u)),
        );
      } else {
        // CREATE
        const newUser = await postData("/user/create", form);

        setUsers((prev) => [...prev, newUser]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  }

  function confirmDelete(id) {
    setDeleteId(id);
  }

  async function doDelete() {
    try {
      await deleteData(`/user/delete/${deleteId}`);

      setUsers((prev) => prev.filter((u) => u.id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      {/* Header */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
            Usuários
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Gerencie os usuários da plataforma
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Novo usuário
          </button>
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-4 py-3">
                  Usuário
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">
                  E-mail
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wide px-4 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-zinc-600 py-12 text-sm"
                  >
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <tr
                    key={user.id}
                    className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} index={i} />
                        <div>
                          <p className="font-medium text-zinc-100 leading-tight">
                            {user.name}
                          </p>
                          <p className="text-zinc-500 text-xs sm:hidden mt-0.5">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(user)}
                          className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 rounded-md transition-colors"
                          title="Editar"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => confirmDelete(user.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/50 rounded-md transition-colors"
                          title="Excluir"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-600">
              {filtered.length} {filtered.length === 1 ? "usuário" : "usuários"}
            </span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-zinc-100 mb-4">
              {editId !== null ? "Editar usuário" : "Novo usuário"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome completo"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveUser}
                disabled={!form.name.trim() || !form.email.trim()}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {editId !== null ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-xs p-6 text-center">
            <div className="w-10 h-10 bg-red-950 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 9v4M12 17h.01" />
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-zinc-100 mb-1">
              Excluir usuário?
            </h2>
            <p className="text-xs text-zinc-500 mb-4">
              Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={doDelete}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
