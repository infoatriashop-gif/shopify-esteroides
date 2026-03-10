"use client";

import { formatCOP } from "@/lib/utils/currency";

export function SavingsBadge({
  originalPrice,
  currentPrice,
  quantity,
}: {
  originalPrice: number;
  currentPrice: number;
  quantity: number;
}) {
  const totalSavings = (originalPrice - currentPrice) * quantity;
  if (totalSavings <= 0) return null;

  const percentOff = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  return (
    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl py-2 px-4">
      <svg
        className="w-4 h-4 text-green-600 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
      <span className="text-sm font-semibold text-green-700">
        Ahorras {formatCOP(totalSavings)} ({percentOff}% OFF)
      </span>
    </div>
  );
}
