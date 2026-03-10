"use client";

import { formatPrice } from "@/lib/utils/currency";

type QuantityOffer = {
  id: number;
  quantity: number;
  discountType: "percent" | "fixed";
  discountValue: number;
  label: string;
  badgeText: string | null;
};

export function QuantityOffers({
  offers,
  selectedOfferId,
  basePrice,
  onSelect,
  countryCode = "CO",
}: {
  offers: QuantityOffer[];
  selectedOfferId: number | null;
  basePrice: number;
  onSelect: (offer: QuantityOffer) => void;
  countryCode?: string;
}) {
  if (offers.length <= 1) return null;
  const fmt = (n: number) => formatPrice(n, countryCode);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
      <h2 className="text-lg font-bold mb-3">Selecciona tu oferta</h2>
      <div className="space-y-2">
        {offers.map((offer) => {
          const unitPrice =
            offer.discountType === "percent"
              ? Math.round(basePrice * (1 - offer.discountValue / 100))
              : basePrice - offer.discountValue;
          const total = unitPrice * offer.quantity;
          const isSelected = selectedOfferId === offer.id;
          const hasDiscount = offer.discountValue > 0;

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => onSelect(offer)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-[var(--color-primary)] bg-blue-50"
                  : "border-[var(--color-border)] hover:border-gray-300"
              }`}
            >
              {/* Radio circle */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? "border-[var(--color-primary)]"
                    : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{offer.label}</span>
                  {offer.badgeText && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                      {offer.badgeText}
                    </span>
                  )}
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  {fmt(unitPrice)} c/u
                  {hasDiscount && (
                    <span className="text-[var(--color-success)] ml-1">
                      ({offer.discountValue}% desc)
                    </span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="text-right flex-shrink-0">
                <div className="font-bold">{fmt(total)}</div>
                {hasDiscount && (
                  <div className="text-xs text-[var(--color-muted)] line-through">
                    {fmt(basePrice * offer.quantity)}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
