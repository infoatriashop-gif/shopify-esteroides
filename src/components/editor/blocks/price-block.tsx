import type { PriceProps } from "@/types/editor";

function formatPrice(amount: number, currency: string) {
  if (currency === "COP") return `$${amount.toLocaleString("es-CO")}`;
  if (currency === "MXN") return `$${amount.toLocaleString("es-MX")}`;
  if (currency === "EUR") return `€${amount.toLocaleString("es-ES")}`;
  return `$${amount.toLocaleString()}`;
}

export default function PriceBlock({ price, compareAtPrice, currency, showBadge, badgeText }: PriceProps) {
  const discount = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  return (
    <div data-testid="block-price" className="flex items-center justify-center gap-3 py-4 px-4">
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-gray-400 dark:text-gray-500 line-through text-lg">
          {formatPrice(compareAtPrice, currency)}
        </span>
      )}
      <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {formatPrice(price, currency)}
      </span>
      {showBadge && discount > 0 && (
        <span className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold px-2 py-1 rounded-md">
          {badgeText || `-${discount}%`}
        </span>
      )}
    </div>
  );
}
