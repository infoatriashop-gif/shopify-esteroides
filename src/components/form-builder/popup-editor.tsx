"use client";

import type { FormPopupConfig } from "@/types/form-config";

type PopupEditorProps = {
  popup: FormPopupConfig;
  onChange: (popup: FormPopupConfig) => void;
};

const ANIMATION_OPTIONS = [
  { value: "slide-up", label: "Deslizar arriba" },
  { value: "fade", label: "Desvanecer" },
  { value: "scale", label: "Escalar" },
];

const RADIUS_OPTIONS: { value: FormPopupConfig["triggerBorderRadius"]; label: string }[] = [
  { value: "none", label: "0" },
  { value: "sm", label: "sm" },
  { value: "md", label: "md" },
  { value: "lg", label: "lg" },
  { value: "xl", label: "xl" },
  { value: "full", label: "pill" },
];

const RADIUS_CSS: Record<string, string> = {
  none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
};

function ColorRow({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-gray-200 dark:border-gray-600 cursor-pointer flex-shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1.5 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono"
        />
      </div>
    </div>
  );
}

export function PopupEditor({ popup, onChange }: PopupEditorProps) {
  const update = (updates: Partial<FormPopupConfig>) => onChange({ ...popup, ...updates });

  // Compute live button style for preview
  const hasGradient = popup.triggerColorTo && popup.triggerColorTo !== popup.triggerColor;
  const bgStyle = hasGradient
    ? { background: `linear-gradient(135deg, ${popup.triggerColor}, ${popup.triggerColorTo})` }
    : { backgroundColor: popup.triggerColor };
  const borderStyle = popup.triggerBorderWidth > 0
    ? { borderWidth: popup.triggerBorderWidth, borderColor: popup.triggerBorderColor, borderStyle: "solid" as const }
    : {};

  return (
    <div className="space-y-5">
      {/* Header note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
        El formulario siempre se abrirá como popup al hacer clic en el botón de compra.
        Personaliza el botón aquí.
      </div>

      {/* Texts */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Texto</h3>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Texto principal</label>
          <input
            type="text"
            value={popup.triggerText}
            onChange={(e) => update({ triggerText: e.target.value })}
            placeholder="Comprar ahora"
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Subtexto <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            type="text"
            value={popup.triggerSubtext}
            onChange={(e) => update({ triggerSubtext: e.target.value })}
            placeholder="Pago contra entrega · Envío a todo Colombia"
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Colores</h3>
        <div className="grid grid-cols-2 gap-3">
          <ColorRow label="Color inicio" value={popup.triggerColor} onChange={(v) => update({ triggerColor: v })} />
          <ColorRow label="Color fin (degradado)" value={popup.triggerColorTo} onChange={(v) => update({ triggerColorTo: v })} />
          <ColorRow label="Color texto" value={popup.triggerTextColor} onChange={(v) => update({ triggerTextColor: v })} />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Borde</h3>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            Grosor del borde: <span className="font-mono">{popup.triggerBorderWidth}px</span>
          </label>
          <input
            type="range"
            min={0}
            max={6}
            step={1}
            value={popup.triggerBorderWidth}
            onChange={(e) => update({ triggerBorderWidth: Number(e.target.value) })}
            className="w-full accent-blue-600"
          />
        </div>
        {popup.triggerBorderWidth > 0 && (
          <ColorRow label="Color del borde" value={popup.triggerBorderColor} onChange={(v) => update({ triggerBorderColor: v })} />
        )}
      </div>

      {/* Border radius */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bordes redondeados</h3>
        <div className="flex gap-1.5 flex-wrap">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => update({ triggerBorderRadius: r.value })}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                popup.triggerBorderRadius === r.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Animation */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Animación del popup</h3>
        <div className="flex gap-2">
          {ANIMATION_OPTIONS.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => update({ animation: a.value as FormPopupConfig["animation"] })}
              className={`flex-1 px-2 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                popup.animation === a.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live preview */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Vista previa</h3>
        <button
          type="button"
          className="w-full py-4 font-bold transition-all hover:opacity-90 cursor-pointer"
          style={{
            ...bgStyle,
            ...borderStyle,
            color: popup.triggerTextColor,
            borderRadius: RADIUS_CSS[popup.triggerBorderRadius] ?? "16px",
          }}
        >
          <span className="block text-base leading-tight">{popup.triggerText || "Comprar ahora"}</span>
          {popup.triggerSubtext && (
            <span className="block text-xs font-normal opacity-80 mt-0.5">{popup.triggerSubtext}</span>
          )}
        </button>
      </div>
    </div>
  );
}
