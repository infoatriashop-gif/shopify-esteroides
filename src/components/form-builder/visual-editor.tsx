"use client";

import type { FormVisualConfig } from "@/types/form-config";

type VisualEditorProps = {
  visual: FormVisualConfig;
  onChange: (visual: FormVisualConfig) => void;
};

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "system", label: "Sistema" },
];

const RADIUS_OPTIONS = [
  { value: "none", label: "Sin bordes" },
  { value: "sm", label: "Pequeño" },
  { value: "md", label: "Medio" },
  { value: "lg", label: "Grande" },
  { value: "xl", label: "Extra Grande" },
  { value: "full", label: "Completo" },
];

const BUTTON_SIZE_OPTIONS = [
  { value: "sm", label: "Pequeño" },
  { value: "md", label: "Mediano" },
  { value: "lg", label: "Grande" },
];

export function VisualEditor({ visual, onChange }: VisualEditorProps) {
  const update = (updates: Partial<FormVisualConfig>) => {
    onChange({ ...visual, ...updates });
  };

  return (
    <div className="space-y-4">
      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Colores
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Color primario
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={visual.primaryColor}
                onChange={(e) => update({ primaryColor: e.target.value })}
                className="w-8 h-8 rounded border border-gray-200 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={visual.primaryColor}
                onChange={(e) => update({ primaryColor: e.target.value })}
                className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Color de fondo
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={visual.backgroundColor}
                onChange={(e) => update({ backgroundColor: e.target.value })}
                className="w-8 h-8 rounded border border-gray-200 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={visual.backgroundColor}
                onChange={(e) => update({ backgroundColor: e.target.value })}
                className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Tipografía
        </h3>
        <select
          value={visual.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value as FormVisualConfig["fontFamily"] })}
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Border radius */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Bordes redondeados
        </h3>
        <div className="flex flex-wrap gap-2">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => update({ borderRadius: r.value as FormVisualConfig["borderRadius"] })}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                visual.borderRadius === r.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Botón de envío
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            value={visual.buttonText}
            onChange={(e) => update({ buttonText: e.target.value })}
            placeholder="Texto del botón"
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div className="flex gap-2">
            {BUTTON_SIZE_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => update({ buttonSize: s.value as FormVisualConfig["buttonSize"] })}
                className={`flex-1 px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  visual.buttonSize === s.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Elementos visibles
        </h3>
        <div className="space-y-2">
          {[
            { key: "showProductSummary" as const, label: "Resumen del producto" },
            { key: "showTrustBadges" as const, label: "Badges de confianza" },
            { key: "showUrgencyTimer" as const, label: "Temporizador de urgencia" },
            { key: "showSocialProof" as const, label: "Prueba social" },
            { key: "showSavingsBadge" as const, label: "Badge de ahorro" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={visual[key]}
                onChange={(e) => update({ [key]: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Urgency timer */}
      {visual.showUrgencyTimer && (
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Minutos del temporizador
          </label>
          <input
            type="number"
            value={visual.urgencyMinutes}
            onChange={(e) => update({ urgencyMinutes: Number(e.target.value) || 15 })}
            min={1}
            max={120}
            className="w-24 px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      )}

      {/* Logo */}
      <div>
        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
          URL del logo (opcional)
        </label>
        <input
          type="text"
          value={visual.logoUrl || ""}
          onChange={(e) => update({ logoUrl: e.target.value || null })}
          placeholder="https://ejemplo.com/logo.png"
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
    </div>
  );
}
