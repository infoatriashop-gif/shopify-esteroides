"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [resetLink, setResetLink] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al procesar la solicitud");
        setStatus("error");
        return;
      }

      setStatus("sent");
      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch {
      setError("Error de conexión");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">SE</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Olvidé mi contraseña</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ingresa tu email para recuperar el acceso
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {status === "sent" ? (
            <div className="space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-lg">
                ✅ Solicitud procesada. Si el email está registrado, recibirás instrucciones.
              </div>

              {resetLink && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    🔧 Modo desarrollo — enlace de recuperación:
                  </p>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-800 dark:text-amber-300 break-all font-mono">
                      {resetLink}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(resetLink);
                      }}
                      className="mt-2 text-xs text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      Copiar enlace
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    En producción este enlace se enviará al email configurado.
                  </p>
                </div>
              )}

              <Link
                href="/login"
                className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Enviando..." : "Recuperar contraseña"}
              </button>

              <Link
                href="/login"
                className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
              >
                Volver al inicio de sesión
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
