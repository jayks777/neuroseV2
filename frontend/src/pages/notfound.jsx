import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="text-center">

        <p className="text-8xl font-bold text-zinc-800 select-none tracking-tight">
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold text-zinc-100">
          Página não encontrada
        </h1>

        <p className="mt-2 text-sm text-zinc-500 max-w-xs mx-auto leading-relaxed">
          O endereço que você acessou não existe ou foi removido.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Voltar para home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
}