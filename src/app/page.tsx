import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background-secondary)] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Shopify Esteroides</h1>
        <p className="text-[var(--color-muted)] mb-8">
          Plataforma E-Commerce COD para Latinoamérica
        </p>

        <div className="space-y-3">
          <Link
            href="/product/producto-ejemplo"
            className="block w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-xl transition-colors"
          >
            Ver Checkout Demo
          </Link>

          <Link
            href="/admin"
            className="block w-full py-3 border-2 border-[var(--color-border)] hover:border-gray-300 font-semibold rounded-xl transition-colors"
          >
            Panel de Administración
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-muted)]">
            v0.1.0 MVP — Colombia COD
          </p>
        </div>
      </div>
    </div>
  );
}
