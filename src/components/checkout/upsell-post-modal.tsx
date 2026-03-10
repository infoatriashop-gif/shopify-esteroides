"use client";

import { useState, useEffect } from "react";
import { formatCOP } from "@/lib/utils/currency";

type UpsellProduct = {
  id: number;
  name: string;
  price: number;
  discountPercent: number;
  imageUrl?: string;
};

export function UpsellPostModal({
  product,
  onAccept,
  onDecline,
}: {
  product: UpsellProduct;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [seconds, setSeconds] = useState(30);
  const [accepting, setAccepting] = useState(false);

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercent / 100)
  );
  const savings = product.price - discountedPrice;

  useEffect(() => {
    if (seconds <= 0) {
      onDecline();
      return;
    }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, onDecline]);

  async function handleAccept() {
    setAccepting(true);
    onAccept();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 mb-0 sm:mb-0 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Timer bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(seconds / 30) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Badge */}
          <div className="flex items-center justify-center mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Oferta Exclusiva — {seconds}s
            </span>
          </div>

          <h3 className="text-xl font-bold text-center mb-1">
            ¡Espera! Completa tu compra
          </h3>
          <p className="text-center text-gray-500 text-sm mb-5">
            Oferta especial solo para ti
          </p>

          {/* Product */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🎁</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-green-600">
                  {formatCOP(discountedPrice)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatCOP(product.price)}
                </span>
              </div>
              <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                Ahorras {formatCOP(savings)} ({product.discountPercent}% OFF)
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mb-3"
          >
            {accepting ? "Agregando..." : `¡Sí, lo quiero! — ${formatCOP(discountedPrice)}`}
          </button>

          <button
            onClick={onDecline}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            No gracias, continuar sin oferta
          </button>
        </div>
      </div>
    </div>
  );
}
