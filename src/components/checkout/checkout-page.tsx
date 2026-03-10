"use client";

import { useState, useReducer, useCallback } from "react";
import { formatPrice } from "@/lib/utils/currency";
import { getCountry, type CountryCode } from "@/lib/constants/countries";
import { COLOMBIA_DEPARTMENTS } from "@/lib/utils/countries";

const COUNTRY_DIAL_CODES: Record<CountryCode, string> = {
  CO: "+57", PE: "+51", MX: "+52", EC: "+593", CL: "+56",
  AR: "+54", PA: "+507", GT: "+502", CR: "+506", PY: "+595",
};
import { QuantityOffers } from "./quantity-offers";
import { OrderSummary } from "./order-summary";
import { TrustBadges } from "./trust-badges";
import { UrgencyTimer } from "./urgency-timer";
import { SavingsBadge } from "./savings-badge";
import { SocialProof } from "./social-proof";
import { UpsellPostModal } from "./upsell-post-modal";
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
  country?: string; // CountryCode
};

type QuantityOffer = {
  id: number;
  quantity: number;
  discountType: "percent" | "fixed";
  discountValue: number;
  label: string;
  badgeText: string | null;
};

type CheckoutState = {
  selectedOfferId: number | null;
  quantity: number;
  unitPrice: number;
  name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  notes: string;
  email: string;
  isSubmitting: boolean;
  errors: Record<string, string>;
};

type CheckoutAction =
  | { type: "SET_OFFER"; offerId: number; quantity: number; unitPrice: number }
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SET_SUBMITTING"; value: boolean };

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_OFFER":
      return { ...state, selectedOfferId: action.offerId, quantity: action.quantity, unitPrice: action.unitPrice };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: "" } };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    default:
      return state;
  }
}

const CTA_COLORS: Record<string, string> = {
  green: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30",
  blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30",
  red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30",
  purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30",
  orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30",
};

// Checks if the product actually has a real image
function hasRealImage(url: string) {
  return !!url && !url.includes("placeholder") && url.trim() !== "";
}

export function CheckoutPage({
  product,
  quantityOffers,
  formConfig,
  upsells = [],
  downsells = [],
  hideProductCard = false,
}: {
  product: Product;
  quantityOffers: QuantityOffer[];
  formConfig?: FormConfig;
  upsells?: UpsellConfig[];
  downsells?: UpsellConfig[];
  hideProductCard?: boolean;
}) {
  const config: FormConfig = {
    showNotes: true,
    showEmail: false,
    urgencyMinutes: 15,
    showSocialProof: true,
    showTrustBadges: true,
    showSavingsBadge: true,
    ctaText: "Confirmar Pedido COD",
    ctaColor: "green",
    headerColor: "gradient",
    ...formConfig,
  };

  const [state, dispatch] = useReducer(checkoutReducer, {
    selectedOfferId: quantityOffers[1]?.id ?? quantityOffers[0]?.id ?? null,
    quantity: quantityOffers[1]?.quantity ?? quantityOffers[0]?.quantity ?? 1,
    unitPrice: quantityOffers[1]
      ? Math.round(product.price * (1 - quantityOffers[1].discountValue / 100))
      : product.price,
    name: "",
    phone: "",
    department: "",
    city: "",
    address: "",
    notes: "",
    email: "",
    isSubmitting: false,
    errors: {},
  });

  const [orderSuccess, setOrderSuccess] = useState<{ orderNumber: string } | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showDownsell, setShowDownsell] = useState(false);
  const [upsellDone, setUpsellDone] = useState(false);

  const country = getCountry(product.country || "CO");
  const subtotal = state.unitPrice * state.quantity;
  const shipping = country.defaultShipping;
  const codFee = country.defaultCodFee;
  const total = subtotal + shipping + codFee;
  const fmt = (amount: number) => formatPrice(amount, country.code);
  const compareAtPrice = product.compareAtPrice || product.price;
  const discount = product.compareAtPrice
    ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
    : 0;
  const showImage = hasRealImage(product.imageUrl);

  function selectOffer(offer: QuantityOffer) {
    const unitPrice =
      offer.discountType === "percent"
        ? Math.round(product.price * (1 - offer.discountValue / 100))
        : product.price - offer.discountValue;
    dispatch({ type: "SET_OFFER", offerId: offer.id, quantity: offer.quantity, unitPrice });
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (state.name.length < 2) errors.name = "Ingresa tu nombre completo";
    const digits = state.phone.replace(/\D/g, "");
    if (country.code === "CO") {
      if (!/^3\d{9}$/.test(digits)) errors.phone = "Numero valido (10 digitos, empieza por 3)";
    } else {
      if (digits.length < country.phoneMinDigits || digits.length > country.phoneMaxDigits)
        errors.phone = `Numero valido (${country.phoneMinDigits}${country.phoneMaxDigits !== country.phoneMinDigits ? `-${country.phoneMaxDigits}` : ""} digitos)`;
    }
    if (!state.department) errors.department = country.hasDepartments ? "Selecciona un departamento" : "Ingresa tu estado / provincia";
    if (state.city.length < 2) errors.city = "Ingresa tu ciudad";
    if (state.address.length < 5) errors.address = "Ingresa tu direccion completa";
    dispatch({ type: "SET_ERRORS", errors });
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    dispatch({ type: "SET_SUBMITTING", value: true });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          quantity: state.quantity,
          selectedOfferId: state.selectedOfferId,
          upsellProductIds: [],
          name: state.name,
          phone: state.phone,
          department: state.department,
          city: state.city,
          address: state.address,
          notes: state.notes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch({ type: "SET_ERRORS", errors: { form: data.error || "Error al procesar el pedido" } });
        return;
      }

      setOrderSuccess({ orderNumber: data.orderNumber });
      if (upsells.length > 0) {
        setShowUpsell(true);
      } else {
        setUpsellDone(true);
      }
    } catch {
      dispatch({ type: "SET_ERRORS", errors: { form: "Error de conexion. Intenta de nuevo." } });
    } finally {
      dispatch({ type: "SET_SUBMITTING", value: false });
    }
  }

  const handleUpsellDecline = useCallback(() => {
    setShowUpsell(false);
    if (downsells.length > 0) setShowDownsell(true);
    else setUpsellDone(true);
  }, [downsells.length]);

  const handleUpsellAccept = useCallback(() => { setShowUpsell(false); setUpsellDone(true); }, []);
  const handleDownsellDecline = useCallback(() => { setShowDownsell(false); setUpsellDone(true); }, []);
  const handleDownsellAccept = useCallback(() => { setShowDownsell(false); setUpsellDone(true); }, []);

  // === SUCCESS SCREEN ===
  if (orderSuccess && !showUpsell && !showDownsell && upsellDone) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Pedido Confirmado</h2>
          <p className="text-gray-500 mb-6">
            Pedido <span className="font-mono font-bold text-gray-900">#{orderSuccess.orderNumber}</span>
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Producto</span>
              <span className="font-medium text-gray-900">{product.name} x{state.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total a pagar</span>
              <span className="font-bold text-lg text-gray-900">{fmt(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Metodo</span>
              <span className="font-medium text-green-600">Pago Contra Entrega</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700">
              <strong>Proximo paso:</strong> Te contactaremos al{" "}
              <span className="font-mono">+57 {state.phone}</span> para confirmar tu pedido.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Transaccion segura y protegida
          </div>
        </div>
      </div>
    );
  }

  // === UPSELL MODAL ===
  if (orderSuccess && showUpsell && upsells.length > 0) {
    const up = upsells[0];
    return (
      <>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center opacity-50">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pedido Confirmado</h2>
          </div>
        </div>
        <UpsellPostModal
          product={{ id: up.id, name: up.name, price: up.price, discountPercent: up.discountPercent }}
          onAccept={handleUpsellAccept}
          onDecline={handleUpsellDecline}
        />
      </>
    );
  }

  // === DOWNSELL MODAL ===
  if (orderSuccess && showDownsell && downsells.length > 0) {
    const down = downsells[0];
    return (
      <>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center opacity-50">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pedido Confirmado</h2>
          </div>
        </div>
        <UpsellPostModal
          product={{ id: down.id, name: down.name, price: down.price, discountPercent: down.discountPercent }}
          onAccept={handleDownsellAccept}
          onDecline={handleDownsellDecline}
        />
      </>
    );
  }

  const ctaColorClass = CTA_COLORS[config.ctaColor] || CTA_COLORS.green;

  // === CHECKOUT FORM ===
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      {/* Desktop 2-col / Mobile single-col */}
      <div className={`mx-auto px-4 py-6 md:py-10 pb-32 md:pb-10 ${hideProductCard ? "max-w-xl" : "max-w-5xl md:grid md:grid-cols-5 md:gap-8"}`}>

        {/* ── LEFT COLUMN (product info) — hidden when landing page is active ── */}
        <div className={`md:col-span-2 space-y-4 mb-6 md:mb-0 ${hideProductCard ? "hidden" : ""}`}>
          {/* Urgency Timer */}
          {config.urgencyMinutes > 0 && <UrgencyTimer minutes={config.urgencyMinutes} />}

          {/* Product Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Image — only when there is a real image */}
            {showImage && (
              <div className="relative w-full bg-gray-50">
                {discount > 0 && (
                  <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    -{discount}%
                  </div>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto block object-contain max-h-[420px]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}

            <div className="p-5">
              {/* Badge when no image */}
              {!showImage && discount > 0 && (
                <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                  -{discount}% DESCUENTO
                </span>
              )}

              <h1 className="text-xl font-bold leading-snug text-gray-900">{product.name}</h1>

              {product.description && (
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{product.description}</p>
              )}

              {/* Selling Points */}
              {product.sellingPoints && product.sellingPoints.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {product.sellingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {fmt(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {fmt(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Savings Badge */}
          {config.showSavingsBadge && (
            <SavingsBadge
              originalPrice={product.price}
              currentPrice={state.unitPrice}
              quantity={state.quantity}
            />
          )}

          {/* Trust Badges — visible in desktop left col, hidden on mobile (shows below form) */}
          <div className="hidden md:block">
            {config.showTrustBadges && <TrustBadges />}
          </div>
        </div>

        {/* ── RIGHT COLUMN (form) ── */}
        <div className={`space-y-4 ${hideProductCard ? "" : "md:col-span-3"}`}>
          {/* Quantity Offers */}
          {quantityOffers.length > 0 && (
            <QuantityOffers
              offers={quantityOffers}
              selectedOfferId={state.selectedOfferId}
              basePrice={product.price}
              onSelect={selectOffer}
              countryCode={country.code}
            />
          )}

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Datos de Envio</h2>
            </div>

            {state.errors.form && (
              <div role="alert" className="bg-red-50 text-red-700 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {state.errors.form}
              </div>
            )}

            <div className="space-y-3">
              {/* Name */}
              <InputField
                id="checkout-name"
                label="Nombre completo"
                placeholder="Tu nombre completo"
                value={state.name}
                error={state.errors.name}
                inputMode="text"
                autoComplete="name"
                icon={
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                onChange={(v) => dispatch({ type: "SET_FIELD", field: "name", value: v })}
              />

              {/* Phone */}
              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-medium text-gray-600 mb-1.5 ml-0.5">
                  Celular
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-medium gap-1.5 whitespace-nowrap">
                    <span className="text-lg">{country.flag}</span>
                    {COUNTRY_DIAL_CODES[country.code]}
                  </span>
                  <input
                    id="checkout-phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder={"0".repeat(country.phoneMinDigits)}
                    value={state.phone}
                    autoComplete="tel"
                    onChange={(e) =>
                      dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value.replace(/\D/g, "").slice(0, country.phoneMaxDigits) })
                    }
                    className={`w-full px-4 py-3.5 text-base border ${state.errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"} rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {state.errors.phone && (
                  <p role="alert" className="text-red-500 text-xs mt-1 ml-1">{state.errors.phone}</p>
                )}
              </div>

              {/* Email (optional) */}
              {config.showEmail && (
                <InputField
                  id="checkout-email"
                  label="Email (opcional)"
                  placeholder="tu@correo.com"
                  value={state.email}
                  inputMode="email"
                  autoComplete="email"
                  icon={
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  onChange={(v) => dispatch({ type: "SET_FIELD", field: "email", value: v })}
                />
              )}

              {/* Department / State */}
              {country.hasDepartments ? (
                <SelectField
                  id="checkout-department"
                  label="Departamento"
                  value={state.department}
                  error={state.errors.department}
                  options={COLOMBIA_DEPARTMENTS.map((d) => ({ value: d, label: d.charAt(0) + d.slice(1).toLowerCase() }))}
                  placeholder="Selecciona tu departamento"
                  onChange={(v) => dispatch({ type: "SET_FIELD", field: "department", value: v })}
                />
              ) : (
                <InputField
                  id="checkout-department"
                  label="Estado / Provincia / Región"
                  placeholder="Ej: Lima, Jalisco, Buenos Aires..."
                  value={state.department}
                  error={state.errors.department}
                  inputMode="text"
                  autoComplete="address-level1"
                  icon={
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  }
                  onChange={(v) => dispatch({ type: "SET_FIELD", field: "department", value: v })}
                />
              )}

              {/* City */}
              <InputField
                id="checkout-city"
                label="Ciudad"
                placeholder="Tu ciudad"
                value={state.city}
                error={state.errors.city}
                inputMode="text"
                autoComplete="address-level2"
                icon={
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
                onChange={(v) => dispatch({ type: "SET_FIELD", field: "city", value: v })}
              />

              {/* Address */}
              <InputField
                id="checkout-address"
                label="Direccion completa"
                placeholder="Calle, carrera, barrio, apto..."
                value={state.address}
                error={state.errors.address}
                inputMode="text"
                autoComplete="street-address"
                icon={
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                onChange={(v) => dispatch({ type: "SET_FIELD", field: "address", value: v })}
              />

              {/* Notes */}
              {config.showNotes && (
                <details className="group">
                  <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 transition-colors select-none">
                    + Agregar nota al pedido
                  </summary>
                  <div className="mt-2">
                    <label htmlFor="checkout-notes" className="sr-only">Nota al pedido</label>
                    <textarea
                      id="checkout-notes"
                      placeholder="Ej: Apartamento 301, edificio azul..."
                      value={state.notes}
                      onChange={(e) => dispatch({ type: "SET_FIELD", field: "notes", value: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-base"
                    />
                  </div>
                </details>
              )}
            </div>
          </form>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Metodo de Pago</h2>
            </div>
            <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-green-800 text-sm">Pago Contra Entrega</p>
                <p className="text-sm text-green-600">
                  Pagas <strong>{fmt(total)}</strong> cuando recibas tu producto
                </p>
              </div>
              <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary
            unitPrice={state.unitPrice}
            quantity={state.quantity}
            subtotal={subtotal}
            shipping={shipping}
            codFee={codFee}
            total={total}
            countryCode={country.code}
          />

          {/* Trust Badges — mobile only (desktop shows in left col) */}
          <div className="md:hidden">
            {config.showTrustBadges && <TrustBadges />}
          </div>

          {/* Desktop CTA (inline, no sticky) */}
          <button
            onClick={handleSubmit}
            disabled={state.isSubmitting}
            className={`hidden md:flex w-full py-4 bg-gradient-to-r ${ctaColorClass} text-white font-bold text-lg rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] items-center justify-center cursor-pointer`}
          >
            {state.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Procesando...
              </span>
            ) : (
              <span className="text-center">
                {config.ctaText} — {fmt(total)}
                <span className="block text-xs font-normal opacity-80 mt-0.5">
                  Pago seguro contra entrega
                </span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-3 z-30 safe-area-inset-bottom">
        <button
          onClick={handleSubmit}
          disabled={state.isSubmitting}
          className={`w-full py-4 bg-gradient-to-r ${ctaColorClass} text-white font-bold text-lg rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer`}
        >
          {state.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Procesando...
            </span>
          ) : (
            <>
              {config.ctaText} — {fmt(total)}
              <span className="block text-xs font-normal opacity-80 mt-0.5">
                Pago seguro contra entrega
              </span>
            </>
          )}
        </button>
      </div>

      {/* Social Proof */}
      {config.showSocialProof && <SocialProof />}
    </div>
  );
}

// === REUSABLE FORM COMPONENTS ===
function InputField({
  id, label, placeholder, value, error, icon, inputMode, autoComplete, onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  icon: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1.5 ml-0.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-3.5 text-base rounded-xl border ${
            error ? "border-red-400 bg-red-50" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
      </div>
      {error && <p role="alert" className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

function SelectField({
  id, label, value, error, options, placeholder, onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1.5 ml-0.5">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3.5 text-base rounded-xl border ${
          error ? "border-red-400 bg-red-50" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all appearance-none cursor-pointer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "20px",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p role="alert" className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}
