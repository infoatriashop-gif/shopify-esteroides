"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fieldStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#F1F5F9",
  fontSize: "14px",
} as React.CSSProperties;

function Field({
  label, type = "text", value, onChange, placeholder, autoFocus, minLength,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  autoFocus?: boolean; minLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#64748B" }}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        required autoFocus={autoFocus} minLength={minLength} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-150"
        style={fieldStyle}
        onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)"; }}
        onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        const loginRes  = await fetch("/api/auth/login", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginData.success) { router.push("/admin"); router.refresh(); }
        else router.push("/login");
      } else { setError(data.message || "Error al registrarse"); }
    } catch { setError("Error de conexion. Intenta de nuevo."); } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "#080C14" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute" style={{ width: "600px", height: "600px", top: "-100px", right: "-100px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute" style={{ width: "500px", height: "500px", bottom: "-80px", left: "-80px",  background: "radial-gradient(circle, rgba(59,130,246,0.07)  0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="w-full max-w-[380px] animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5" style={{ background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)" }}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>
            Crea tu cuenta
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "#64748B" }}>Configura tu tienda COD en minutos</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7" style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset" }}>
          {error && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl mb-5 text-sm animate-scale-in" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#FCA5A5" }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Nombre"      value={name}     onChange={setName}     placeholder="Tu nombre"        autoFocus />
            <Field label="Email"       type="email"  value={email}    onChange={setEmail}    placeholder="tu@email.com" />
            <Field label="Contraseña"  type="password" value={password} onChange={setPassword} placeholder="Minimo 8 caracteres" minLength={8} />
            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: loading ? "#2563EB" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", boxShadow: loading ? "none" : "0 4px 14px rgba(59,130,246,0.35)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creando cuenta...
                </span>
              ) : "Crear cuenta gratis"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: "#475569" }}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium transition-colors" style={{ color: "#3B82F6" }}>
            Inicia sesion
          </Link>
        </p>
        <p className="text-center text-[11px] mt-6" style={{ color: "#2D3F55" }}>
          Shopify Esteroides · Panel Administrativo
        </p>
      </div>
    </div>
  );
}
