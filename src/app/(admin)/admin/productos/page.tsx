"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatCOP } from "@/lib/utils/currency";
import type { Product } from "@/types/product";

/* ── Shared input style ──────────────────────────────────────────────────── */
const inputCls =
  "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-surface)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-[var(--color-muted)]";

export default function ProductosPage() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading,  setLoading]    = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [formData, setFormData]   = useState({ name: "", price: "", stock: "", description: "" });
  const [saving,   setSaving]     = useState(false);
  const [deleting, setDeleting]   = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res  = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function handleAdd() {
    if (!formData.name || !formData.price) return;
    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:        formData.name,
          price:       parseInt(formData.price),
          stock:       parseInt(formData.stock) || 100,
          description: formData.description,
        }),
      });
      if (res.ok) { setFormData({ name: "", price: "", stock: "", description: "" }); setShowForm(false); fetchProducts(); }
    } finally { setSaving(false); }
  }

  async function toggleActive(product: Product) {
    await fetch(`/api/products/${product.id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ isActive: !product.isActive }),
    });
    fetchProducts();
  }

  async function duplicateProduct(id: number) {
    await fetch(`/api/products/${id}/duplicate`, { method: "POST" });
    fetchProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm("¿Eliminar este producto?")) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-foreground)", letterSpacing: "-0.02em" }}>
            Productos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
            {products.length} {products.length === 1 ? "producto" : "productos"} en tu catálogo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/productos/nuevo"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
            style={{
              background: "rgba(139,92,246,0.1)",
              color: "#8B5CF6",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generar con IA
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 cursor-pointer"
            style={{
              background: showForm ? "#374151" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              boxShadow:  showForm ? "none" : "0 4px 12px rgba(59,130,246,0.3)",
            }}
          >
            {showForm ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancelar
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Producto
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-2xl p-6 animate-scale-in"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <h3 className="font-semibold text-sm mb-5" style={{ color: "var(--color-foreground)" }}>
            Nuevo Producto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Nombre *",       key: "name",        type: "text",   placeholder: "Crema Facial Premium" },
              { label: "Precio (COP) *", key: "price",       type: "number", placeholder: "89000" },
              { label: "Stock",          key: "stock",       type: "number", placeholder: "100" },
              { label: "Descripcion",    key: "description", type: "text",   placeholder: "Descripcion corta del producto" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-muted)" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={formData[f.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving || !formData.name || !formData.price}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 cursor-pointer disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
            >
              {saving && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              {saving ? "Guardando..." : "Guardar Producto"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
              style={{ background: "var(--color-border)", color: "var(--color-muted)" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
            Catálogo de Productos
          </p>
        </div>
        <table className="w-full" style={{ background: "var(--color-surface)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Producto", "Precio", "Stock", "Estado", ""].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-widest ${h === "" ? "text-right" : "text-left"}`}
                  style={{ color: "var(--color-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: "var(--color-border)" }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7" style={{ color: "var(--color-muted)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>Sin productos</p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                      Crea el primero o genera uno con IA
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product, idx) => (
                <tr
                  key={product.id}
                  className="transition-colors duration-100"
                  style={{
                    borderBottom: idx < products.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: "var(--color-border)" }}
                      >
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover" />
                        ) : (
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5" style={{ color: "var(--color-muted)" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
                          {product.name}
                        </p>
                        <p className="text-[11px] font-mono truncate" style={{ color: "var(--color-muted)" }}>
                          /product/{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                      {formatCOP(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs line-through ml-2" style={{ color: "var(--color-muted)" }}>
                        {formatCOP(product.compareAtPrice)}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: product.stock > 10 ? "#10B981" : product.stock > 0 ? "#F59E0B" : "#EF4444",
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleActive(product)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer"
                      style={
                        product.isActive
                          ? { background: "rgba(16,185,129,0.1)", color: "#10B981" }
                          : { background: "var(--color-border)", color: "var(--color-muted)" }
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: product.isActive ? "#10B981" : "#64748B" }}
                      />
                      {product.isActive ? "Activo" : "Inactivo"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <ActionBtn href={`/admin/productos/${product.id}`} color="#8B5CF6" label="Editar" />
                      <ActionBtn href={`/admin/editor/${product.id}`}   color="#3B82F6" label="Landing" />
                      <ActionBtn href={`/product/${product.slug}`} color="#10B981" label="Ver" external />
                      <button
                        onClick={() => duplicateProduct(product.id)}
                        className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
                        style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}
                      >
                        Duplicar
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        disabled={deleting === product.id}
                        className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444" }}
                      >
                        {deleting === product.id ? "..." : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionBtn({
  href, color, label, external,
}: { href: string; color: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
      style={{ background: `${color}18`, color }}
    >
      {label}
    </Link>
  );
}
