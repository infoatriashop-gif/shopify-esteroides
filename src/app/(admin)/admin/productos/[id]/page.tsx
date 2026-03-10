"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils/currency";
import { COUNTRY_LIST, getCountry } from "@/lib/constants/countries";
import type { Product, QuantityOffer, UpsellConfig, FormConfig } from "@/types/product";
import { DEFAULT_FORM_CONFIG, DEFAULT_QUANTITY_OFFERS } from "@/types/product";

type Tab = "info" | "offers" | "upsells" | "form";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("info");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        // Ensure defaults
        setProduct({
          ...data,
          quantityOffers: data.quantityOffers?.length ? data.quantityOffers : DEFAULT_QUANTITY_OFFERS.map((o) => ({ ...o, productId: data.id })),
          upsells: data.upsells || [],
          downsells: data.downsells || [],
          formConfig: { ...DEFAULT_FORM_CONFIG, ...data.formConfig },
        });
      })
      .catch(() => router.push("/admin/productos"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSave() {
    if (!product) return;
    setSaving(true);
    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "info", label: "Informacion" },
    { id: "offers", label: "Ofertas por Cantidad" },
    { id: "upsells", label: "Upsells / Downsells" },
    { id: "form", label: "Formulario" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.push("/admin/productos")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Editar: {product.name}</h2>
          <p className="text-sm text-gray-400">/{product.slug}</p>
        </div>
        <a href={`/product/${product.slug}`} target="_blank" className="px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
          Vista previa
        </a>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saved ? "✓ Guardado" : saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              tab === t.id ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {tab === "info" && <InfoTab product={product} onChange={setProduct} />}
        {tab === "offers" && <OffersTab product={product} onChange={setProduct} />}
        {tab === "upsells" && <UpsellsTab product={product} onChange={setProduct} />}
        {tab === "form" && <FormTab product={product} onChange={setProduct} />}
      </div>
    </div>
  );
}

// === INFO TAB ===
function InfoTab({ product, onChange }: { product: Product; onChange: (p: Product) => void }) {
  const country = getCountry(product.country || "CO");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input type="text" value={product.name} onChange={(e) => onChange({ ...product, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input type="text" value={product.slug} onChange={(e) => onChange({ ...product, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Country selector */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">País de venta</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {COUNTRY_LIST.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => onChange({ ...product, country: c.code })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                  (product.country || "CO") === c.code
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.name}</span>
                <span className="ml-auto text-xs text-gray-400">{c.currency}</span>
              </button>
            ))}
          </div>
          {country && (
            <p className="text-xs text-gray-400 mt-1">
              Moneda: {country.currency} · Símbolo: {country.currencySymbol} · Envío por defecto: {formatPrice(country.defaultShipping, country.code)} · COD fee: {formatPrice(country.defaultCodFee, country.code)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio ({country.currency})
          </label>
          <input type="number" value={product.price} onChange={(e) => onChange({ ...product, price: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio anterior (tachado)</label>
          <input type="number" value={product.compareAtPrice || ""} onChange={(e) => onChange({ ...product, compareAtPrice: e.target.value ? parseFloat(e.target.value) : null })}
            placeholder="Dejar vacio si no aplica"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input type="text" value={product.sku} onChange={(e) => onChange({ ...product, sku: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input type="number" value={product.stock} onChange={(e) => onChange({ ...product, stock: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <input type="text" value={product.category} onChange={(e) => onChange({ ...product, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de imagen</label>
          <input type="text" value={product.imageUrl || ""} onChange={(e) => onChange({ ...product, imageUrl: e.target.value || null })}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
        <textarea value={product.description} onChange={(e) => onChange({ ...product, description: e.target.value })}
          rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Puntos de venta (uno por linea)</label>
        <textarea
          value={product.sellingPoints.join("\n")}
          onChange={(e) => onChange({ ...product, sellingPoints: e.target.value.split("\n").filter(Boolean) })}
          rows={4} placeholder="Resultados visibles en 2 semanas&#10;Ingredientes naturales&#10;Envio gratis"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={product.isActive} onChange={(e) => onChange({ ...product, isActive: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="text-sm font-medium">Producto activo</span>
        </label>
      </div>
    </div>
  );
}

// === OFFERS TAB ===
function OffersTab({ product, onChange }: { product: Product; onChange: (p: Product) => void }) {
  const offers = product.quantityOffers;

  function updateOffer(index: number, update: Partial<QuantityOffer>) {
    const updated = [...offers];
    updated[index] = { ...updated[index], ...update };
    onChange({ ...product, quantityOffers: updated });
  }

  function addOffer() {
    const maxId = offers.length > 0 ? Math.max(...offers.map((o) => o.id)) : 0;
    onChange({
      ...product,
      quantityOffers: [
        ...offers,
        {
          id: maxId + 1,
          productId: product.id,
          quantity: offers.length + 1,
          discountType: "percent",
          discountValue: (offers.length + 1) * 10,
          label: `${offers.length + 1} unidades`,
          badgeText: null,
          sortOrder: offers.length,
          isActive: true,
        },
      ],
    });
  }

  function removeOffer(index: number) {
    onChange({ ...product, quantityOffers: offers.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Ofertas por Cantidad</h3>
          <p className="text-sm text-gray-400">Configura descuentos por volumen para aumentar el ticket promedio</p>
        </div>
        <button onClick={addOffer} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Agregar oferta
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">No hay ofertas por cantidad. Agrega una para empezar.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer, i) => (
            <div key={offer.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Oferta #{i + 1}</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" checked={offer.isActive} onChange={(e) => updateOffer(i, { isActive: e.target.checked })}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
                    <span className="text-xs">Activa</span>
                  </label>
                  <button onClick={() => removeOffer(i)} className="text-xs text-red-500 hover:underline">Eliminar</button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Cantidad</label>
                  <input type="number" value={offer.quantity} onChange={(e) => updateOffer(i, { quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Tipo descuento</label>
                  <select value={offer.discountType} onChange={(e) => updateOffer(i, { discountType: e.target.value as "percent" | "fixed" })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="percent">Porcentaje %</option>
                    <option value="fixed">Fijo $</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Valor</label>
                  <input type="number" value={offer.discountValue} onChange={(e) => updateOffer(i, { discountValue: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Etiqueta</label>
                  <input type="text" value={offer.label} onChange={(e) => updateOffer(i, { label: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Badge</label>
                  <input type="text" value={offer.badgeText || ""} onChange={(e) => updateOffer(i, { badgeText: e.target.value || null })}
                    placeholder="Ej: Mas Popular"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Precio unitario: {formatPrice(offer.discountType === "percent"
                  ? Math.round(product.price * (1 - offer.discountValue / 100))
                  : product.price - offer.discountValue
                )} | Total: {formatPrice(
                  (offer.discountType === "percent"
                    ? Math.round(product.price * (1 - offer.discountValue / 100))
                    : product.price - offer.discountValue
                  ) * offer.quantity
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// === UPSELLS TAB ===
function UpsellsTab({ product, onChange }: { product: Product; onChange: (p: Product) => void }) {
  function addUpsell(type: "pre" | "post") {
    const list = type === "pre" ? product.upsells : product.downsells;
    const maxId = list.length > 0 ? Math.max(...list.map((u) => u.id)) : 0;
    const newItem: UpsellConfig = { id: maxId + 1, name: "", price: 0, discountPercent: 30, type, isActive: true };
    if (type === "pre") {
      onChange({ ...product, upsells: [...product.upsells, newItem] });
    } else {
      onChange({ ...product, downsells: [...product.downsells, newItem] });
    }
  }

  function updateItem(type: "pre" | "post", index: number, update: Partial<UpsellConfig>) {
    if (type === "pre") {
      const updated = [...product.upsells];
      updated[index] = { ...updated[index], ...update };
      onChange({ ...product, upsells: updated });
    } else {
      const updated = [...product.downsells];
      updated[index] = { ...updated[index], ...update };
      onChange({ ...product, downsells: updated });
    }
  }

  function removeItem(type: "pre" | "post", index: number) {
    if (type === "pre") {
      onChange({ ...product, upsells: product.upsells.filter((_, i) => i !== index) });
    } else {
      onChange({ ...product, downsells: product.downsells.filter((_, i) => i !== index) });
    }
  }

  function renderList(title: string, subtitle: string, items: UpsellConfig[], type: "pre" | "post") {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <button onClick={() => addUpsell(type)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
            + Agregar
          </button>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center border border-dashed border-gray-200 rounded-xl">Sin {title.toLowerCase()} configurados</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" checked={item.isActive} onChange={(e) => updateItem(type, i, { isActive: e.target.checked })}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600" />
                    <span className="text-xs font-medium">Activo</span>
                  </label>
                  <button onClick={() => removeItem(type, i)} className="text-xs text-red-500 hover:underline">Eliminar</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nombre del producto</label>
                    <input type="text" value={item.name} onChange={(e) => updateItem(type, i, { name: e.target.value })}
                      placeholder="Kit Complementario Premium"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Precio original (COP)</label>
                    <input type="number" value={item.price} onChange={(e) => updateItem(type, i, { price: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Descuento %</label>
                    <input type="number" value={item.discountPercent} onChange={(e) => updateItem(type, i, { discountPercent: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                {item.price > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Precio con descuento: {formatPrice(Math.round(item.price * (1 - item.discountPercent / 100)))}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {renderList("Upsells (Post-compra)", "Se muestran despues de confirmar el pedido como oferta especial", product.upsells, "pre")}
      <hr className="border-gray-200" />
      {renderList("Downsells", "Se muestran si el cliente rechaza el upsell, con precio mas bajo", product.downsells, "post")}
    </div>
  );
}

// === FORM TAB ===
function FormTab({ product, onChange }: { product: Product; onChange: (p: Product) => void }) {
  const config = product.formConfig;

  function updateConfig(update: Partial<FormConfig>) {
    onChange({ ...product, formConfig: { ...config, ...update } });
  }

  const colorOptions = [
    { value: "green", label: "Verde", class: "bg-green-500" },
    { value: "blue", label: "Azul", class: "bg-blue-500" },
    { value: "red", label: "Rojo", class: "bg-red-500" },
    { value: "purple", label: "Morado", class: "bg-purple-500" },
    { value: "orange", label: "Naranja", class: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Personalizar Formulario de Checkout</h3>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Texto del boton CTA</label>
        <input type="text" value={config.ctaText} onChange={(e) => updateConfig({ ctaText: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* CTA Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color del boton CTA</label>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c.value}
              onClick={() => updateConfig({ ctaColor: c.value })}
              className={`w-10 h-10 rounded-xl ${c.class} transition-all ${config.ctaColor === c.value ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : "opacity-70 hover:opacity-100"}`}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Timer */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minutos del timer de urgencia</label>
        <input type="number" value={config.urgencyMinutes} onChange={(e) => updateConfig({ urgencyMinutes: parseInt(e.target.value) || 0 })}
          min={0} max={60}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <p className="text-xs text-gray-400 mt-1">0 para desactivar el timer</p>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Elementos del formulario</h4>
        {[
          { key: "showNotes" as const, label: "Mostrar campo de notas" },
          { key: "showEmail" as const, label: "Mostrar campo de email" },
          { key: "showSocialProof" as const, label: "Mostrar social proof (notificaciones)" },
          { key: "showTrustBadges" as const, label: "Mostrar badges de confianza" },
          { key: "showSavingsBadge" as const, label: "Mostrar badge de ahorro" },
        ].map((toggle) => (
          <label key={toggle.key} className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-6 rounded-full transition-colors relative ${config[toggle.key] ? "bg-blue-600" : "bg-gray-300"}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${config[toggle.key] ? "translate-x-4.5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm">{toggle.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
