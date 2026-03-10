"use client";

import { formatPrice } from "@/lib/utils/currency";

export function OrderSummary({
  unitPrice,
  quantity,
  subtotal,
  shipping,
  codFee,
  total,
  discountAmount,
  couponCode,
  countryCode = "CO",
}: {
  unitPrice: number;
  quantity: number;
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  discountAmount?: number;
  couponCode?: string;
  countryCode?: string;
}) {
  const fmt = (n: number) => formatPrice(n, countryCode);
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-bold mb-3">Resumen del Pedido</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-muted)]">
            Subtotal ({quantity}x {fmt(unitPrice)})
          </span>
          <span>{fmt(subtotal)}</span>
        </div>

        {discountAmount && discountAmount > 0 && (
          <div className="flex justify-between text-[var(--color-success)]">
            <span>Descuento {couponCode && `(${couponCode})`}</span>
            <span>-{fmt(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-[var(--color-muted)]">Envío</span>
          <span>{fmt(shipping)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--color-muted)]">Cargo COD</span>
          <span>{fmt(codFee)}</span>
        </div>

        <div className="border-t border-[var(--color-border)] pt-2 mt-2">
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span className="text-[var(--color-primary)]">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
