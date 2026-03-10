"use client";

import type { EditorBlock } from "@/types/editor";
import { ImageUpload, MultiImageUpload } from "./image-upload";

type BlockPropertiesProps = {
  block: EditorBlock;
  onChange: (block: EditorBlock) => void;
  onDelete: () => void;
};

export function BlockProperties({ block, onChange, onDelete }: BlockPropertiesProps) {
  const updateProps = (updates: Record<string, unknown>) => {
    onChange({ ...block, props: { ...block.props, ...updates } } as EditorBlock);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
          {block.type}
        </h3>
        <button
          onClick={onDelete}
          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400"
        >
          Eliminar
        </button>
      </div>

      {block.type === "hero" && (
        <div className="space-y-3">
          <ImageUpload label="Imagen hero" value={block.props.imageUrl} onChange={(v) => updateProps({ imageUrl: v })} />
          <Field label="URL de video (opcional)" value={block.props.videoUrl || ""} onChange={(v) => updateProps({ videoUrl: v })} />
          <Field label="Texto overlay" value={block.props.overlayText || ""} onChange={(v) => updateProps({ overlayText: v })} />
          <Select label="Posicion overlay" value={block.props.overlayPosition} options={["top", "center", "bottom"]} onChange={(v) => updateProps({ overlayPosition: v })} />
          <Select label="Altura" value={block.props.height} options={["auto", "sm", "md", "lg", "full"]} onChange={(v) => updateProps({ height: v })} />
          <Select label="Ajuste imagen" value={block.props.objectFit || "contain"} options={["contain", "cover"]} onChange={(v) => updateProps({ objectFit: v })} />
        </div>
      )}

      {block.type === "text" && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Contenido HTML</label>
            <textarea
              value={block.props.content}
              onChange={(e) => updateProps({ content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
            />
          </div>
          <Select label="Alineacion" value={block.props.alignment} options={["left", "center", "right"]} onChange={(v) => updateProps({ alignment: v })} />
        </div>
      )}

      {block.type === "gallery" && (
        <div className="space-y-3">
          <MultiImageUpload
            label="Imagenes de galeria"
            images={block.props.images || []}
            onChange={(urls) => updateProps({ images: urls })}
          />
          <Select label="Layout" value={block.props.layout} options={["carousel", "grid-2", "grid-3", "slider"]} onChange={(v) => updateProps({ layout: v })} />
          <Toggle label="Lightbox" checked={block.props.showLightbox} onChange={(v) => updateProps({ showLightbox: v })} />
        </div>
      )}

      {block.type === "video" && (
        <div className="space-y-3">
          <Field label="URL del video" value={block.props.url} onChange={(v) => updateProps({ url: v })} placeholder="YouTube, Vimeo o MP4" />
          <ImageUpload label="Thumbnail" value={block.props.thumbnailUrl || ""} onChange={(v) => updateProps({ thumbnailUrl: v })} />
          <Toggle label="Autoplay" checked={block.props.autoplay} onChange={(v) => updateProps({ autoplay: v })} />
          <Toggle label="Mudo" checked={block.props.muted} onChange={(v) => updateProps({ muted: v })} />
        </div>
      )}

      {block.type === "testimonials" && (
        <div className="space-y-3">
          <Select label="Layout" value={block.props.layout} options={["grid", "carousel", "list"]} onChange={(v) => updateProps({ layout: v })} />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {block.props.items.length} testimonio(s)
          </p>
          {block.props.items.map((item: { id: string; name: string; text: string; rating: number }, idx: number) => (
            <div key={item.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded space-y-1">
              <div className="flex items-center justify-between">
                <Field label="Nombre" value={item.name} onChange={(v) => {
                  const items = [...block.props.items];
                  items[idx] = { ...items[idx], name: v };
                  updateProps({ items });
                }} />
                <button
                  onClick={() => updateProps({ items: block.props.items.filter((_: unknown, i: number) => i !== idx) })}
                  className="text-[10px] text-red-400 hover:text-red-600 ml-1 mt-3"
                >
                  x
                </button>
              </div>
              <Field label="Texto" value={item.text} onChange={(v) => {
                const items = [...block.props.items];
                items[idx] = { ...items[idx], text: v };
                updateProps({ items });
              }} />
            </div>
          ))}
          <button
            onClick={() => updateProps({ items: [...block.props.items, { id: String(Date.now()), name: "Nuevo", rating: 5, text: "" }] })}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Agregar testimonio
          </button>
        </div>
      )}

      {block.type === "benefits" && (
        <div className="space-y-3">
          <Select label="Layout" value={block.props.layout} options={["horizontal", "vertical", "grid"]} onChange={(v) => updateProps({ layout: v })} />
          {block.props.items.map((item: { id: string; icon: string; title: string; description: string }, idx: number) => (
            <div key={item.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded space-y-1">
              <div className="flex gap-1">
                <input value={item.icon} onChange={(e) => { const items = [...block.props.items]; items[idx] = { ...items[idx], icon: e.target.value }; updateProps({ items }); }} className="w-12 px-1 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-center" />
                <input value={item.title} onChange={(e) => { const items = [...block.props.items]; items[idx] = { ...items[idx], title: e.target.value }; updateProps({ items }); }} className="flex-1 px-2 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Titulo" />
                <button
                  onClick={() => updateProps({ items: block.props.items.filter((_: unknown, i: number) => i !== idx) })}
                  className="text-[10px] text-red-400 hover:text-red-600 px-1"
                >
                  x
                </button>
              </div>
              <input value={item.description} onChange={(e) => { const items = [...block.props.items]; items[idx] = { ...items[idx], description: e.target.value }; updateProps({ items }); }} className="w-full px-2 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Descripcion" />
            </div>
          ))}
          <button
            onClick={() => updateProps({ items: [...block.props.items, { id: String(Date.now()), icon: "✅", title: "Nuevo", description: "" }] })}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Agregar beneficio
          </button>
        </div>
      )}

      {block.type === "countdown" && (
        <div className="space-y-3">
          <Select label="Modo" value={block.props.mode} options={["evergreen", "fixed"]} onChange={(v) => updateProps({ mode: v })} />
          {block.props.mode === "evergreen" && (
            <NumberField label="Horas" value={block.props.hours || 2} onChange={(v) => updateProps({ hours: v })} min={1} max={72} />
          )}
          {block.props.mode === "fixed" && (
            <Field label="Fecha fin (ISO)" value={block.props.endDate || ""} onChange={(v) => updateProps({ endDate: v })} placeholder="2026-12-31T23:59:59" />
          )}
          <Select label="Estilo" value={block.props.style} options={["inline", "banner", "floating"]} onChange={(v) => updateProps({ style: v })} />
          <Field label="Texto" value={block.props.label} onChange={(v) => updateProps({ label: v })} />
        </div>
      )}

      {block.type === "price" && (
        <div className="space-y-3">
          <NumberField label="Precio" value={block.props.price} onChange={(v) => updateProps({ price: v })} />
          <NumberField label="Precio antes" value={block.props.compareAtPrice || 0} onChange={(v) => updateProps({ compareAtPrice: v || undefined })} />
          <Field label="Moneda" value={block.props.currency} onChange={(v) => updateProps({ currency: v })} />
          <Toggle label="Badge descuento" checked={block.props.showBadge} onChange={(v) => updateProps({ showBadge: v })} />
          {block.props.showBadge && (
            <Field label="Texto badge" value={block.props.badgeText} onChange={(v) => updateProps({ badgeText: v })} />
          )}
        </div>
      )}

      {block.type === "cta" && (
        <div className="space-y-3">
          <Field label="Texto" value={block.props.text} onChange={(v) => updateProps({ text: v })} />
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Color</label>
              <input type="color" value={block.props.color} onChange={(e) => updateProps({ color: e.target.value })} className="w-full h-8 rounded border border-gray-200 dark:border-gray-600 cursor-pointer" />
            </div>
            <Select label="Tamano" value={block.props.size} options={["sm", "md", "lg"]} onChange={(v) => updateProps({ size: v })} />
          </div>
          <Select label="Accion" value={block.props.action} options={["scroll-form", "open-popup", "link"]} onChange={(v) => updateProps({ action: v })} />
          {block.props.action === "link" && (
            <Field label="URL" value={block.props.linkUrl || ""} onChange={(v) => updateProps({ linkUrl: v })} />
          )}
          <Select label="Animacion" value={block.props.animation} options={["none", "pulse", "shake", "glow"]} onChange={(v) => updateProps({ animation: v })} />
          <Field label="Icono (emoji)" value={block.props.icon || ""} onChange={(v) => updateProps({ icon: v })} />
        </div>
      )}

      {block.type === "separator" && (
        <div className="space-y-3">
          <Select label="Tipo" value={block.props.type} options={["line", "space", "wave", "zigzag"]} onChange={(v) => updateProps({ type: v })} />
          <NumberField label="Altura (px)" value={block.props.height} onChange={(v) => updateProps({ height: v })} min={4} max={200} />
          {block.props.type !== "space" && (
            <Field label="Color" value={block.props.color || ""} onChange={(v) => updateProps({ color: v })} />
          )}
        </div>
      )}

      {block.type === "faq" && (
        <div className="space-y-3">
          <Toggle label="Schema SEO" checked={block.props.schemaMarkup} onChange={(v) => updateProps({ schemaMarkup: v })} />
          {block.props.items.map((item: { id: string; question: string; answer: string }, idx: number) => (
            <div key={item.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">#{idx + 1}</span>
                <button
                  onClick={() => updateProps({ items: block.props.items.filter((_: unknown, i: number) => i !== idx) })}
                  className="text-[10px] text-red-400 hover:text-red-600"
                >
                  x
                </button>
              </div>
              <Field label="Pregunta" value={item.question} onChange={(v) => {
                const items = [...block.props.items];
                items[idx] = { ...items[idx], question: v };
                updateProps({ items });
              }} />
              <Field label="Respuesta" value={item.answer} onChange={(v) => {
                const items = [...block.props.items];
                items[idx] = { ...items[idx], answer: v };
                updateProps({ items });
              }} />
            </div>
          ))}
          <button
            onClick={() => updateProps({ items: [...block.props.items, { id: String(Date.now()), question: "Nueva pregunta", answer: "" }] })}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Agregar pregunta
          </button>
        </div>
      )}

      {block.type === "html" && (
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Codigo HTML</label>
          <textarea
            value={block.props.code}
            onChange={(e) => updateProps({ code: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono"
            placeholder="<div>Tu HTML aqui</div>"
          />
        </div>
      )}

      {block.type === "buynow" && (
        <div className="space-y-3">
          <Field label="Texto principal" value={block.props.text} onChange={(v) => updateProps({ text: v })} placeholder="Comprar ahora" />
          <Field label="Subtexto (opcional)" value={block.props.subtext} onChange={(v) => updateProps({ subtext: v })} placeholder="Pago contra entrega..." />
          <div className="grid grid-cols-2 gap-2">
            <ColorField label="Color inicio" value={block.props.colorFrom} onChange={(v) => updateProps({ colorFrom: v })} />
            <ColorField label="Color fin" value={block.props.colorTo} onChange={(v) => updateProps({ colorTo: v })} />
            <ColorField label="Color texto" value={block.props.textColor} onChange={(v) => updateProps({ textColor: v })} />
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              Borde: {block.props.borderWidth}px
            </label>
            <input type="range" min={0} max={6} step={1} value={block.props.borderWidth}
              onChange={(e) => updateProps({ borderWidth: Number(e.target.value) })}
              className="w-full accent-blue-600" />
          </div>
          {block.props.borderWidth > 0 && (
            <ColorField label="Color del borde" value={block.props.borderColor} onChange={(v) => updateProps({ borderColor: v })} />
          )}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Bordes redondeados</label>
            <div className="flex gap-1 flex-wrap">
              {(["none","sm","md","lg","xl","full"] as const).map((r) => (
                <button key={r} onClick={() => updateProps({ borderRadius: r })}
                  className={`px-2 py-1 text-xs rounded border cursor-pointer transition-colors ${block.props.borderRadius === r ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700" : "border-gray-200 dark:border-gray-600 text-gray-500"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          {/* Animation */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Animación</label>
            <div className="grid grid-cols-2 gap-1">
              {([
                { value: "none",      label: "Sin animación" },
                { value: "heartbeat", label: "❤️ Latido" },
                { value: "shake",     label: "📳 Sacudida" },
                { value: "bounce",    label: "⬆️ Rebote" },
                { value: "glow",      label: "✨ Brillo" },
                { value: "breathe",   label: "🌊 Respirar" },
                { value: "rubber",    label: "🎯 Elástico" },
                { value: "flash",     label: "⚡ Destello" },
              ] as const).map((a) => (
                <button key={a.value} onClick={() => updateProps({ animation: a.value })}
                  className={`px-2 py-1.5 text-xs rounded border cursor-pointer transition-colors text-left ${block.props.animation === a.value ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Vista previa</label>
            <div className={`w-full font-bold text-sm text-center py-3 px-4 leading-tight ${{ none:"", heartbeat:"btn-anim-heartbeat", shake:"btn-anim-shake", bounce:"btn-anim-bounce", glow:"btn-anim-glow", breathe:"btn-anim-breathe", rubber:"btn-anim-rubber", flash:"btn-anim-flash" }[block.props.animation as string] ?? ""}`}
              style={{
                background: block.props.colorTo && block.props.colorTo !== block.props.colorFrom
                  ? `linear-gradient(135deg, ${block.props.colorFrom}, ${block.props.colorTo})`
                  : block.props.colorFrom,
                color: block.props.textColor,
                borderRadius: ({ none:"0",sm:"4px",md:"8px",lg:"12px",xl:"16px",full:"9999px" })[block.props.borderRadius] ?? "16px",
                ...(block.props.borderWidth > 0 ? { border: `${block.props.borderWidth}px solid ${block.props.borderColor}` } : {}),
              }}>
              {block.props.text || "Comprar ahora"}
              {block.props.subtext && <div className="text-xs font-normal opacity-80 mt-0.5">{block.props.subtext}</div>}
            </div>
          </div>
        </div>
      )}

      {block.type === "trust" && (
        <div className="space-y-3">
          <Select label="Layout" value={block.props.layout} options={["row", "grid"]} onChange={(v) => updateProps({ layout: v })} />
          {block.props.badges.map((badge: { id: string; icon: string; label: string }, idx: number) => (
            <div key={badge.id} className="flex gap-1 items-center">
              <input value={badge.icon} onChange={(e) => { const badges = [...block.props.badges]; badges[idx] = { ...badges[idx], icon: e.target.value }; updateProps({ badges }); }} className="w-10 px-1 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-center" />
              <input value={badge.label} onChange={(e) => { const badges = [...block.props.badges]; badges[idx] = { ...badges[idx], label: e.target.value }; updateProps({ badges }); }} className="flex-1 px-2 py-1 text-sm rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
              <button
                onClick={() => updateProps({ badges: block.props.badges.filter((_: unknown, i: number) => i !== idx) })}
                className="text-[10px] text-red-400 hover:text-red-600 px-1"
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={() => updateProps({ badges: [...block.props.badges, { id: String(Date.now()), icon: "✅", label: "Nuevo" }] })}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            + Agregar badge
          </button>
        </div>
      )}
    </div>
  );
}

// Helper components
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <div className="flex gap-1.5 items-center">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded border border-gray-200 dark:border-gray-600 cursor-pointer flex-shrink-0" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono" />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-gray-300 dark:border-gray-600"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
}
