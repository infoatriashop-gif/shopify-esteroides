"use client";

import { useState, useEffect, useCallback } from "react";
import type { FormPopupConfig } from "@/types/form-config";
import { CheckoutPage } from "./checkout-page";
import type { FormConfig, UpsellConfig } from "@/types/product";

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  imageUrl: string;
  stock: number;
  sellingPoints?: string[];
};

type QuantityOffer = {
  id: number;
  quantity: number;
  discountType: "percent" | "fixed";
  discountValue: number;
  label: string;
  badgeText: string | null;
};

const RADIUS_CSS: Record<string, string> = {
  none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
};

const ANIMATION_CLASSES: Record<string, { hidden: string; visible: string }> = {
  "slide-up": {
    hidden: "translate-y-full opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  scale: {
    hidden: "scale-95 opacity-0",
    visible: "scale-100 opacity-100",
  },
};

type CheckoutModalProps = {
  product: Product;
  quantityOffers: QuantityOffer[];
  formConfig?: FormConfig;
  popupConfig: FormPopupConfig;
  upsells?: UpsellConfig[];
  downsells?: UpsellConfig[];
  hideProductCard?: boolean;
};

export function CheckoutModal({
  product,
  quantityOffers,
  formConfig,
  popupConfig,
  upsells = [],
  downsells = [],
  hideProductCard = false,
}: CheckoutModalProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeModal]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const hasGradient = popupConfig.triggerColorTo && popupConfig.triggerColorTo !== popupConfig.triggerColor;
  const bgStyle = hasGradient
    ? { background: `linear-gradient(135deg, ${popupConfig.triggerColor}, ${popupConfig.triggerColorTo})` }
    : { backgroundColor: popupConfig.triggerColor };
  const borderStyle = popupConfig.triggerBorderWidth > 0
    ? { borderWidth: popupConfig.triggerBorderWidth, borderColor: popupConfig.triggerBorderColor, borderStyle: "solid" as const }
    : {};

  const anim = ANIMATION_CLASSES[popupConfig.animation] ?? ANIMATION_CLASSES["slide-up"];

  return (
    <>
      {/* Buy Now Button — always full width */}
      <div className="w-full px-4 py-4" id="checkout-form">
        <button
          onClick={openModal}
          className="w-full py-4 font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer shadow-lg"
          style={{
            ...bgStyle,
            ...borderStyle,
            color: popupConfig.triggerTextColor,
            borderRadius: RADIUS_CSS[popupConfig.triggerBorderRadius] ?? "16px",
          }}
          aria-haspopup="dialog"
        >
          <span className="block leading-tight">{popupConfig.triggerText || "Comprar ahora"}</span>
          {popupConfig.triggerSubtext && (
            <span className="block text-xs font-normal opacity-80 mt-0.5">
              {popupConfig.triggerSubtext}
            </span>
          )}
        </button>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de compra"
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
            onClick={closeModal}
          />

          {/* Panel */}
          <div
            className={`relative w-full md:max-w-2xl md:mx-4 md:rounded-2xl bg-transparent overflow-hidden transition-all duration-300 ease-out ${anim[visible ? "visible" : "hidden"]}`}
            style={{ maxHeight: "calc(100dvh - 0px)" }}
          >
            {/* Close button */}
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable checkout content */}
            <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(100dvh - 0px)" }}>
              <CheckoutPage
                product={product}
                quantityOffers={quantityOffers}
                formConfig={formConfig}
                upsells={upsells}
                downsells={downsells}
                hideProductCard={hideProductCard}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
