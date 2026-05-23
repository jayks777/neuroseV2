import { useState } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

export default function Test() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = {
    name: !form.name.trim() ? "Nome é obrigatório." : form.name.trim().length < 3 ? "Mínimo de 3 caracteres." : null,
    email: !form.email.trim()
      ? "E-mail é obrigatório."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? "E-mail inválido."
      : null,
  };

  const isValid = !errors.name && !errors.email;

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  }

  function handleReset() {
    setForm({ name: "", email: "" });
    setTouched({ name: false, email: false });
    setSubmitted(false);
  }

  const initials = getInitials(form.name || "?");

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f11; }

        .page {
          min-height: 100vh;
          background: #0f0f11;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Decorative blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
          pointer-events: none;
        }
        .blob-1 { width: 480px; height: 480px; background: #f59e0b; top: -120px; right: -80px; }
        .blob-2 { width: 360px; height: 360px; background: #f97316; bottom: -100px; left: -60px; }
        .blob-3 { width: 220px; height: 220px; background: #fbbf24; top: 50%; left: 50%; transform: translate(-50%,-50%); }

        /* Grid lines background */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          background: rgba(20, 20, 24, 0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.5rem 2.5rem 2.8rem;
          box-shadow: 0 0 0 1px rgba(245,158,11,0.08), 0 32px 80px rgba(0,0,0,0.6);
          backdrop-filter: blur(12px);
          animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top accent line */
        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          border-radius: 100px;
          background: linear-gradient(90deg, transparent, #f59e0b, transparent);
        }

        /* Avatar preview */
        .avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2.2rem;
          gap: 0.6rem;
        }
        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: #0f0f11;
          letter-spacing: 1px;
          box-shadow: 0 0 0 4px rgba(245,158,11,0.15), 0 8px 24px rgba(249,115,22,0.25);
          transition: transform 0.2s;
        }
        .avatar:hover { transform: scale(1.06); }
        .avatar-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
        }

        /* Heading */
        .heading {
          font-family: 'DM Serif Display', serif;
          font-size: 1.85rem;
          color: #f5f5f5;
          line-height: 1.15;
          margin-bottom: 0.4rem;
          text-align: center;
        }
        .heading em {
          font-style: italic;
          color: #f59e0b;
        }
        .subheading {
          text-align: center;
          color: rgba(255,255,255,0.35);
          font-size: 0.85rem;
          font-weight: 400;
          margin-bottom: 2rem;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 2rem;
        }

        /* Fields */
        .field { margin-bottom: 1.4rem; }
        .label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 0.55rem;
        }
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.2);
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        input[type="text"],
        input[type="email"] {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        input:focus {
          border-color: rgba(245,158,11,0.5);
          background: rgba(245,158,11,0.04);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
        }
        input.has-error {
          border-color: rgba(248,113,113,0.5);
          background: rgba(248,113,113,0.04);
        }
        input::placeholder { color: rgba(255,255,255,0.18); }

        .error-msg {
          margin-top: 0.45rem;
          font-size: 0.75rem;
          color: #f87171;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        /* Submit button */
        .btn-submit {
          width: 100%;
          margin-top: 0.6rem;
          padding: 0.9rem 1.5rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: #0f0f11;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(249,115,22,0.3);
        }
        .btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.4);
        }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(15,15,17,0.3);
          border-top-color: #0f0f11;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Success state */
        .success-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0 0.5rem;
          animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
        }
        .success-icon {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          box-shadow: 0 0 0 8px rgba(245,158,11,0.12);
        }
        .success-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #f5f5f5;
          text-align: center;
        }
        .success-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
          text-align: center;
          line-height: 1.5;
        }
        .success-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          color: #f59e0b;
          font-size: 0.82rem;
          font-weight: 500;
        }
        .btn-back {
          margin-top: 0.5rem;
          padding: 0.75rem 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-back:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        /* Footer note */
        .footer-note {
          margin-top: 1.5rem;
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="page">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-bg" />

        <div className="card">
          {submitted ? (
            <SuccessState name={form.name} email={form.email} onReset={handleReset} />
          ) : (
            <>
              {/* Avatar preview */}
              <div className="avatar-wrap">
                <div className="avatar">{initials}</div>
                <span className="avatar-label">Pré-visualização do avatar</span>
              </div>

              <h1 className="heading">
                Criar <em>novo</em> usuário
              </h1>
              <p className="subheading">Preencha os campos abaixo para adicionar um membro à plataforma.</p>

              <div className="divider" />

              <form onSubmit={handleSubmit} noValidate>
                {/* Nome */}
                <div className="field">
                  <label className="label" htmlFor="name">Nome completo</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Ex: Maria Oliveira"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.name && errors.name ? "has-error" : ""}
                      autoComplete="off"
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="error-msg">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="field">
                  <label className="label" htmlFor="email">Endereço de e-mail</label>
                  <div className="input-wrap">
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Ex: maria@empresa.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? "has-error" : ""}
                      autoComplete="off"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="error-msg">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? (
                    <><div className="spinner" /> Criando usuário…</>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Criar usuário
                    </>
                  )}
                </button>
              </form>

              <p className="footer-note">Os dados serão enviados ao servidor após confirmação.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function SuccessState({ name, email, onReset }) {
  return (
    <div className="success-wrap">
      <div className="success-icon">✓</div>
      <h2 className="success-title">Usuário criado!</h2>
      <p className="success-sub">
        O novo membro foi adicionado à plataforma com sucesso.
      </p>
      <div className="success-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        {name}
      </div>
      <div className="success-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        {email}
      </div>
      <button className="btn-back" onClick={onReset}>← Criar outro usuário</button>
    </div>
  );
}