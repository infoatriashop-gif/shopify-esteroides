"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCOP } from "@/lib/utils/currency"
import { formatPrice } from "@/lib/utils/currency";

const CATEGORIES = [
  { value: "all", label: "Cualquier categoria" },
  { value: "Salud y Bienestar", label: "Salud y Bienestar" },
  { value: "Tecnología", label: "Tecnologia" },
  { value: "Hogar", label: "Hogar" },
  { value: "Belleza", label: "Belleza" },
  { value: "Fitness", label: "Fitness" },
];

type GeneratedProduct = {
  name: string;
  description: string;
  sellingPoints: string[];
  price: number;
  compareAtPrice: number;
  category: string;
  stock: number;
};

export default function NuevoProductoIA() {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [customPrompt, setCustomPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState<GeneratedProduct | null>(null);
  const [editMode, setEditMode] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    setGenerated(null);
    try {
      const res = await fetch("/api/products/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, customPrompt }),
      });
      const data = await res.json();
      setGenerated(data);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!generated) return;
    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generated),
      });
      if (res.ok) {
        router.push("/admin/productos");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/admin/productos")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold">Generar Producto con IA</h2>
          <p className="text-sm text-gray-400">Crea paginas de producto optimizadas para COD en segundos</p>
        </div>
      </div>

      {/* Generation Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripcion personalizada (opcional)
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ej: Un serum facial anti-edad con vitamina C y acido hialuronico..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <span>✨</span>
                Generar Producto con IA
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Product Preview */}
      {generated && (
        <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Producto Generado</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {editMode ? "Vista previa" : "Editar"}
              </button>
              <button
                onClick={handleGenerate}
                className="px-3 py-1.5 text-sm border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Regenerar
              </button>
            </div>
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={generated.name}
                  onChange={(e) => setGenerated({ ...generated, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
                <textarea
                  value={generated.description}
                  onChange={(e) => setGenerated({ ...generated, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                  <input
                    type="number"
                    value={generated.price}
                    onChange={(e) => setGenerated({ ...generated, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio anterior</label>
                  <input
                    type="number"
                    value={generated.compareAtPrice}
                    onChange={(e) => setGenerated({ ...generated, compareAtPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Puntos de venta (uno por linea)</label>
                <textarea
                  value={generated.sellingPoints.join("\n")}
                  onChange={(e) => setGenerated({ ...generated, sellingPoints: e.target.value.split("\n").filter(Boolean) })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview card */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                      {generated.category}
                    </span>
                    <h4 className="text-xl font-bold mt-2">{generated.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{formatCOP(generated.price)}</p>
                    {generated.compareAtPrice > generated.price && (
                      <p className="text-sm text-gray-400 line-through">{formatCOP(generated.compareAtPrice)}</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{generated.description}</p>

                <div className="space-y-2">
                  {generated.sellingPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs flex-shrink-0">
                        ✓
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {generated.compareAtPrice > generated.price && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-green-700 font-medium">
                    Ahorro: {formatCOP(generated.compareAtPrice - generated.price)} ({Math.round((1 - generated.price / generated.compareAtPrice) * 100)}% OFF)
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar y Publicar"}
            </button>
            <button
              onClick={() => setGenerated(null)}
              className="px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Descartar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
