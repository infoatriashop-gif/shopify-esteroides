"use client";

export function TrustBadges() {
  return (
    <div className="flex justify-center gap-6 py-4">
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-[10px] text-[var(--color-muted)] text-center leading-tight">
          Envío
          <br />
          Seguro
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span className="text-[10px] text-[var(--color-muted)] text-center leading-tight">
          Pago Contra
          <br />
          Entrega
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--color-warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        </div>
        <span className="text-[10px] text-[var(--color-muted)] text-center leading-tight">
          Garantía de
          <br />
          Satisfacción
        </span>
      </div>
    </div>
  );
}
