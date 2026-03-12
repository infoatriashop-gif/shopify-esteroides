"use client";

import { useState, useEffect, useCallback } from "react";

type TabId = "general" | "dominio" | "dropi" | "pixels" | "fraude";

type AllSettings = {
  general: {
    storeName: string;
    currency: string;
    shippingFee: number;
    codFee: number;
    serverIp: string;
  };
  domain: {
    customDomain: string;
    verified: boolean;
  };
  dropi: {
    enabled: boolean;
    environment: string;
    apiKey: string;
    autoSync: boolean;
  };
  pixels: {
    fbPixelId: string;
    fbAccessToken: string;
    fbEnabled: boolean;
    tiktokPixelId: string;
    tiktokAccessToken: string;
    tiktokEnabled: boolean;
  };
  fraud: {
    maxOrdersPerIpPerHour: number;
    maxOrdersPerPhonePerDay: number;
    maxOrdersPerEmailPerDay: number;
    blockedUsers: { id: number; type: string; value: string; reason: string }[];
  };
};

const DEFAULT_SETTINGS: AllSettings = {
  general: { storeName: "Mi Tienda COD", currency: "COP", shippingFee: 12000, codFee: 5000, serverIp: "" },
  domain: { customDomain: "", verified: false },
  dropi: { enabled: false, environment: "test", apiKey: "", autoSync: true },
  pixels: { fbPixelId: "", fbAccessToken: "", fbEnabled: false, tiktokPixelId: "", tiktokAccessToken: "", tiktokEnabled: false },
  fraud: { maxOrdersPerIpPerHour: 3, maxOrdersPerPhonePerDay: 5, maxOrdersPerEmailPerDay: 5, blockedUsers: [] },
};

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [settings, setSettings] = useState<AllSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings({ ...DEFAULT_SETTINGS, ...data }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saveNamespace = useCallback(async (namespace: string, values: Record<string, unknown>) => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namespace, values }),
    });
  }, []);

  const tabs: { id: TabId; label: string; svg: React.ReactNode }[] = [
    { id: "general", label: "General", svg: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: "dominio", label: "Dominio", svg: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )},
    { id: "dropi", label: "Dropi", svg: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { id: "pixels", label: "Pixels", svg: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { id: "fraude", label: "Anti-Fraude", svg: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )},
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-foreground)", letterSpacing: "-0.02em" }}>
          Configuracion
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
          Personaliza tu tienda, integraciones y seguridad
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit flex-wrap"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
            style={
              activeTab === tab.id
                ? { background: "rgba(59,130,246,0.1)", color: "#3B82F6" }
                : { color: "var(--color-muted)" }
            }
          >
            {tab.svg}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
        {activeTab === "general" && (
          <GeneralSettings
            values={settings.general}
            onChange={(v) => setSettings({ ...settings, general: v })}
            onSave={() => saveNamespace("general", settings.general)}
          />
        )}
        {activeTab === "dominio" && (
          <DomainSettings
            values={settings.domain}
            onChange={(v) => setSettings({ ...settings, domain: v })}
            onSave={() => saveNamespace("domain", settings.domain)}
          />
        )}
        {activeTab === "dropi" && (
          <DropiSettings
            values={settings.dropi}
            onChange={(v) => setSettings({ ...settings, dropi: v })}
            onSave={() => saveNamespace("dropi", settings.dropi)}
          />
        )}
        {activeTab === "pixels" && (
          <PixelSettings
            values={settings.pixels}
            onChange={(v) => setSettings({ ...settings, pixels: v })}
            onSave={() => saveNamespace("pixels", settings.pixels)}
          />
        )}
        {activeTab === "fraude" && (
          <FraudeSettings
            values={settings.fraud}
            onChange={(v) => setSettings({ ...settings, fraud: v })}
            onSave={() => saveNamespace("fraud", settings.fraud)}
          />
        )}
      </div>
    </div>
  );
}

/* ── Shared UI primitives ─────────────────────────────────────────────────── */
const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-surface)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-[var(--color-muted)]";
const labelCls = "block text-xs font-semibold uppercase tracking-wider mb-2";
const sectionTitle = "text-base font-semibold mb-5";

function SaveBtn({ saved, label = "Guardar", onClick }: { saved: boolean; label?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
      style={{
        background: saved ? "linear-gradient(135deg,#10B981,#059669)" : "linear-gradient(135deg,#3B82F6,#2563EB)",
        boxShadow: saved ? "0 4px 12px rgba(16,185,129,0.3)" : "0 4px 12px rgba(59,130,246,0.3)",
      }}
    >
      {saved ? (
        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Guardado</>
      ) : label}
    </button>
  );
}

function GeneralSettings({
  values,
  onChange,
  onSave,
}: {
  values: AllSettings["general"];
  onChange: (v: AllSettings["general"]) => void;
  onSave: () => void;
}) {
  const [saved, setSaved] = useState(false);
  async function handleSave() { await onSave(); setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <h3 className={sectionTitle} style={{ color: "var(--color-foreground)" }}>Configuracion General</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>Nombre de la Tienda</label>
          <input type="text" value={values.storeName} onChange={(e) => onChange({ ...values, storeName: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>Moneda</label>
          <input type="text" value={values.currency} disabled className={inputCls} style={{ opacity: 0.5 }} />
          <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>Solo COP en v1 (Colombia)</p>
        </div>
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>Cargo por Envio (COP)</label>
          <input type="number" value={values.shippingFee} onChange={(e) => onChange({ ...values, shippingFee: parseInt(e.target.value) || 0 })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>Cargo COD (COP)</label>
          <input type="number" value={values.codFee} onChange={(e) => onChange({ ...values, codFee: parseInt(e.target.value) || 0 })} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>IP del Servidor</label>
          <input type="text" value={values.serverIp} onChange={(e) => onChange({ ...values, serverIp: e.target.value.trim() })} placeholder="ej: 185.123.45.67" className={`${inputCls} font-mono`} />
          <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>IP de tu servidor VPS/Railway. Se usa en la guia de DNS del tab Dominio.</p>
        </div>
      </div>
      <SaveBtn saved={saved} label="Guardar Cambios" onClick={handleSave} />
    </div>
  );
}

function DropiSettings({
  values,
  onChange,
  onSave,
}: {
  values: AllSettings["dropi"];
  onChange: (v: AllSettings["dropi"]) => void;
  onSave: () => void;
}) {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleTest() {
    if (!values.apiKey) {
      setTestResult("error:Ingresa tu API Key de Dropi");
      return;
    }
    setTestResult("testing");
    try {
      const res = await fetch("/api/dropi/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: values.apiKey, environment: values.environment }),
      });
      const data = await res.json();
      setTestResult(data.success ? `success:${data.message}` : `error:${data.message}`);
    } catch {
      setTestResult("error:Error de conexion");
    }
  }

  async function handleSave() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const ToggleSwitch = ({ checked, onChange: onChg }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChg(!checked)} className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200" style={{ background: checked ? "#3B82F6" : "var(--color-border)" }}>
      <span className="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5" style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={sectionTitle} style={{ color: "var(--color-foreground)" }}>Integracion Dropi</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>Habilitado</span>
          <ToggleSwitch checked={values.enabled} onChange={(v) => onChange({ ...values, enabled: v })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>Ambiente</label>
          <select value={values.environment} onChange={(e) => onChange({ ...values, environment: e.target.value })} className={inputCls}>
            <option value="test">Test (test-api.dropi.co)</option>
            <option value="production">Produccion (api.dropi.co)</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={{ color: "var(--color-muted)" }}>API Key</label>
          <input type="password" value={values.apiKey} onChange={(e) => onChange({ ...values, apiKey: e.target.value })} placeholder="Token del dashboard de Dropi" className={inputCls} />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <ToggleSwitch checked={values.autoSync} onChange={(v) => onChange({ ...values, autoSync: v })} />
        <span className="text-sm" style={{ color: "var(--color-foreground)" }}>Sincronizar pedidos automaticamente al crear</span>
      </label>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleTest}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
          style={{ background: "var(--color-border)", color: "var(--color-foreground)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Probar Conexion
        </button>
        <SaveBtn saved={saved} label="Guardar" onClick={handleSave} />
        {testResult === "testing" && <span className="text-sm" style={{ color: "var(--color-muted)" }}>Probando...</span>}
        {testResult?.startsWith("success:") && <span className="text-sm" style={{ color: "#10B981" }}>✓ {testResult.split(":")[1]}</span>}
        {testResult?.startsWith("error:")   && <span className="text-sm" style={{ color: "#EF4444" }}>✗ {testResult.split(":")[1]}</span>}
      </div>
      <div className="pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          Webhook URL:{" "}
          <code className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ background: "var(--color-border)", color: "var(--color-foreground)" }}>
            {typeof window !== "undefined" ? window.location.origin : "https://tu-dominio.com"}/api/dropi/webhook
          </code>
        </p>
      </div>
    </div>
  );
}

function PixelSettings({
  values,
  onChange,
  onSave,
}: {
  values: AllSettings["pixels"];
  onChange: (v: AllSettings["pixels"]) => void;
  onSave: () => void;
}) {
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200"
      style={{ background: checked ? "#3B82F6" : "var(--color-border)" }}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5"
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <h3 className={sectionTitle} style={{ color: "var(--color-foreground)" }}>Tracking Pixels</h3>

      {/* Facebook */}
      <div className="rounded-xl p-5 space-y-4" style={{ border: "1px solid var(--color-border)", background: "var(--color-background-secondary)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3B82F6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>Facebook Pixel + CAPI</h4>
              <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>PageView · ViewContent · InitiateCheckout · Purchase</p>
            </div>
          </div>
          <ToggleSwitch checked={values.fbEnabled} onChange={(v) => onChange({ ...values, fbEnabled: v })} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className={labelCls} style={{ color: "var(--color-muted)" }}>Pixel ID</label>
            <input type="text" value={values.fbPixelId} onChange={(e) => onChange({ ...values, fbPixelId: e.target.value })} placeholder="123456789012345" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} style={{ color: "var(--color-muted)" }}>Access Token (CAPI)</label>
            <input type="password" value={values.fbAccessToken} onChange={(e) => onChange({ ...values, fbAccessToken: e.target.value })} placeholder="EAAxxxxxxx (opcional)" className={inputCls} />
          </div>
        </div>
      </div>

      {/* TikTok */}
      <div className="rounded-xl p-5 space-y-4" style={{ border: "1px solid var(--color-border)", background: "var(--color-background-secondary)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.06)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--color-foreground)" }}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.84 4.84 0 01-1.01-.06z"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>TikTok Pixel</h4>
              <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>PageView · ViewContent · InitiateCheckout · CompletePayment</p>
            </div>
          </div>
          <ToggleSwitch checked={values.tiktokEnabled} onChange={(v) => onChange({ ...values, tiktokEnabled: v })} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className={labelCls} style={{ color: "var(--color-muted)" }}>Pixel ID</label>
            <input type="text" value={values.tiktokPixelId} onChange={(e) => onChange({ ...values, tiktokPixelId: e.target.value })} placeholder="ABCDEF123456" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} style={{ color: "var(--color-muted)" }}>Access Token (Events API)</label>
            <input type="password" value={values.tiktokAccessToken} onChange={(e) => onChange({ ...values, tiktokAccessToken: e.target.value })} placeholder="Token (opcional)" className={inputCls} />
          </div>
        </div>
      </div>

      <SaveBtn saved={saved} label="Guardar Configuracion de Pixels" onClick={handleSave} />
    </div>
  );
}

function FraudeSettings({
  values,
  onChange,
  onSave,
}: {
  values: AllSettings["fraud"];
  onChange: (v: AllSettings["fraud"]) => void;
  onSave: () => void;
}) {
  const [newBlock, setNewBlock] = useState({ type: "phone", value: "", reason: "" });
  const [saved, setSaved] = useState(false);

  function addBlock() {
    if (!newBlock.value) return;
    const updated = {
      ...values,
      blockedUsers: [...values.blockedUsers, { id: Date.now(), ...newBlock }],
    };
    onChange(updated);
  }

  function removeBlock(id: number) {
    onChange({
      ...values,
      blockedUsers: values.blockedUsers.filter((b) => b.id !== id),
    });
  }

  async function handleSave() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <h3 className={sectionTitle} style={{ color: "var(--color-foreground)" }}>Prevencion de Fraude</h3>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-muted)" }}>Rate Limiting (por 24 horas)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Max pedidos por IP",       key: "maxOrdersPerIpPerHour",     val: values.maxOrdersPerIpPerHour },
            { label: "Max pedidos por Telefono", key: "maxOrdersPerPhonePerDay",   val: values.maxOrdersPerPhonePerDay },
            { label: "Max pedidos por Email",    key: "maxOrdersPerEmailPerDay",   val: values.maxOrdersPerEmailPerDay },
          ].map((f) => (
            <div key={f.key}>
              <label className={labelCls} style={{ color: "var(--color-muted)" }}>{f.label}</label>
              <input type="number" value={f.val}
                onChange={(e) => onChange({ ...values, [f.key]: parseInt(e.target.value) || 0 })}
                className={inputCls} />
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-muted)" }}>Lista Negra</p>
        <div className="flex gap-2 mb-4 flex-wrap">
          <select value={newBlock.type} onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value })} className={`${inputCls} w-auto`}>
            <option value="phone">Telefono</option>
            <option value="ip">IP</option>
            <option value="email">Email</option>
          </select>
          <input type="text" value={newBlock.value} onChange={(e) => setNewBlock({ ...newBlock, value: e.target.value })}
            placeholder={newBlock.type === "phone" ? "3001234567" : newBlock.type === "ip" ? "192.168.1.1" : "email@ejemplo.com"}
            className={`${inputCls} flex-1 min-w-[140px]`} />
          <input type="text" value={newBlock.reason} onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })}
            placeholder="Razon (opcional)" className={`${inputCls} flex-1 min-w-[120px]`} />
          <button onClick={addBlock}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 cursor-pointer"
            style={{ background: "linear-gradient(135deg,#EF4444,#DC2626)", boxShadow: "0 4px 12px rgba(239,68,68,0.3)" }}>
            Bloquear
          </button>
        </div>
        {values.blockedUsers.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>No hay usuarios bloqueados</p>
        ) : (
          <div className="space-y-2">
            {values.blockedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>{user.type}</span>
                  <span className="text-sm font-mono" style={{ color: "var(--color-foreground)" }}>{user.value}</span>
                  {user.reason && <span className="text-xs" style={{ color: "var(--color-muted)" }}>— {user.reason}</span>}
                </div>
                <button onClick={() => removeBlock(user.id)} className="text-xs font-medium cursor-pointer transition-colors" style={{ color: "#EF4444" }}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <SaveBtn saved={saved} label="Guardar Configuracion" onClick={handleSave} />
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <button
      onClick={copy}
      className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all duration-150 cursor-pointer"
      style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
      title="Copiar"
    >
      {copied ? "✓" : "Copiar"}
    </button>
  );
}

function DnsRecord({
  step,
  badge,
  badgeCls,
  subtitle,
  fields,
}: {
  step: string;
  badge: string;
  badgeCls: string;
  subtitle: string;
  fields: { label: string; value: string; highlight?: boolean }[];
}) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeCls}`}>{badge}</span>
        <span className="text-xs" style={{ color: "var(--color-muted)" }}>{subtitle}</span>
      </div>
      <div className="grid gap-4 text-sm" style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}>
        {fields.map((f) => (
          <div key={f.label}>
            <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1" style={{ color: "var(--color-muted)" }}>{f.label}</span>
            <div className="flex items-center">
              <code className="font-mono font-bold text-xs break-all" style={{ color: f.highlight ? "#3B82F6" : "var(--color-foreground)" }}>{f.value}</code>
              {f.highlight && <CopyButton value={f.value} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FIREBASE_CNAME = "shopify-esteroides--shopify-esteroides-2026.us-central1.hosted.app";

function DomainSettings({
  values,
  onChange,
  onSave,
}: {
  values: AllSettings["domain"];
  onChange: (v: AllSettings["domain"]) => void;
  onSave: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [checking, setChecking] = useState(false);
  const [dnsStatus, setDnsStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [txtToken, setTxtToken] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<"hostinger" | "cloudflare" | "godaddy" | "namecheap">("hostinger");

  const isSubdomain = values.customDomain ? values.customDomain.split(".").length > 2 : true;
  const cnameHost = isSubdomain
    ? values.customDomain.split(".").slice(0, -2).join(".") || "www"
    : "@";

  async function handleSave() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleAddDomain() {
    if (!values.customDomain) return;
    try {
      const res = await fetch("/api/domains/verify-dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: values.customDomain, action: "add" }),
      });
      const data = await res.json();
      setTxtToken(data.txtToken);
      setDnsStatus(data.status);
    } catch {
      setDnsStatus("error");
    }
  }

  async function handleVerify() {
    if (!values.customDomain) return;
    setChecking(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/domains/verify-dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: values.customDomain, action: "verify" }),
      });
      const data = await res.json();
      setDnsStatus(data.status);
      if (data.errorMessage) setErrorMsg(data.errorMessage);
      if (data.status === "active") {
        onChange({ ...values, verified: true });
      }
    } catch {
      setDnsStatus("error");
      setErrorMsg("Error de red al verificar. Intenta de nuevo.");
    } finally {
      setChecking(false);
    }
  }

  const statusBadge = (status: string | null) => {
    const map: Record<string, { label: string; cls: string }> = {
      pending: { label: "Pendiente — agrega los registros DNS", cls: "bg-yellow-100 text-yellow-700" },
      txt_verified: { label: "TXT verificado — ahora agrega el CNAME", cls: "bg-blue-100 text-blue-700" },
      active: { label: "Activo — Dominio conectado correctamente", cls: "bg-green-100 text-green-700" },
      error: { label: "Error en la verificacion", cls: "bg-red-100 text-red-700" },
    };
    const s = map[status || ""] || map.pending;
    return <span className={`text-xs px-2 py-1 rounded font-medium ${s.cls}`}>{s.label}</span>;
  };

  const providers = [
    { id: "hostinger" as const, label: "Hostinger", recommended: true },
    { id: "cloudflare" as const, label: "Cloudflare", recommended: false },
    { id: "godaddy" as const, label: "GoDaddy", recommended: false },
    { id: "namecheap" as const, label: "Namecheap", recommended: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Dominio Personalizado</h3>
        <p className="text-sm text-gray-500 mt-1">
          Conecta tu propio dominio para que tus paginas de checkout luzcan profesionales con tu marca.
        </p>
      </div>

      {/* Info Firebase hosting */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-800">Tu app esta en Firebase App Hosting</p>
          <p className="text-xs text-blue-700 mt-0.5">
            Para conectar tu dominio debes apuntar un registro <strong>CNAME</strong> a Firebase.
            No se necesita IP ni servidor VPS.
          </p>
        </div>
      </div>

      {/* Domain input */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
          Tu dominio personalizado
        </label>
        <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>
          Usa un subdominio como <strong>tienda.tudominio.com</strong> o <strong>www.tudominio.com</strong>.
          Los dominios raiz (@) requieren soporte de CNAME flattening (Cloudflare).
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={values.customDomain}
            onChange={(e) => {
              onChange({ ...values, customDomain: e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, ""), verified: false });
              setDnsStatus(null);
              setTxtToken(null);
              setErrorMsg(null);
            }}
            placeholder="tienda.tudominio.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
          {!txtToken ? (
            <button
              onClick={handleAddDomain}
              disabled={!values.customDomain}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              Generar token
            </button>
          ) : (
            <button
              onClick={handleVerify}
              disabled={!values.customDomain || checking}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {checking ? "Verificando..." : "Verificar DNS"}
            </button>
          )}
        </div>

        {/* Status */}
        {values.verified && (
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Dominio verificado y activo
          </div>
        )}
        {dnsStatus && !values.verified && (
          <div className="mt-3 space-y-2">
            {statusBadge(dnsStatus)}
            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 font-mono">
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </div>

      {/* DNS Guide — visible una vez generado el token */}
      {values.customDomain && txtToken && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-5 space-y-4">
          <div>
            <h4 className="font-semibold text-blue-900">Registros DNS que debes agregar</h4>
            <p className="text-sm text-blue-700 mt-1">
              Agrega estos <strong>2 registros</strong> en tu proveedor de dominios en el orden indicado.
              Luego haz click en <strong>&quot;Verificar DNS&quot;</strong>.
            </p>
          </div>

          <div className="space-y-3">
            {/* PASO 1 — TXT */}
            <DnsRecord
              step="1"
              badge="PASO 1 — TXT (verificacion de propiedad)"
              badgeCls="bg-purple-100 text-purple-700"
              subtitle="Demuestra que eres el dueno del dominio"
              fields={[
                { label: "Tipo", value: "TXT" },
                { label: "Nombre / Host", value: "@" },
                { label: "Valor / Contenido", value: txtToken, highlight: true },
                { label: "TTL", value: "3600" },
              ]}
            />
            {/* PASO 2 — CNAME */}
            <DnsRecord
              step="2"
              badge="PASO 2 — CNAME (apuntar a Firebase)"
              badgeCls="bg-blue-100 text-blue-700"
              subtitle="Dirige el trafico de tu dominio a tu tienda"
              fields={[
                { label: "Tipo", value: "CNAME" },
                { label: "Nombre / Host", value: cnameHost, highlight: true },
                { label: "Apunta a / Valor", value: FIREBASE_CNAME, highlight: true },
                { label: "TTL", value: "3600" },
              ]}
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 space-y-1">
            <p><strong>Tiempo de propagacion:</strong> Entre 5 minutos y 48 horas segun tu proveedor.</p>
            <p><strong>Hostinger y Cloudflare</strong> suelen propagar en menos de 30 minutos.</p>
            <p>Puedes verificar la propagacion en <strong>dnschecker.org</strong> buscando tu dominio con tipo CNAME.</p>
          </div>
        </div>
      )}

      {/* Provider step-by-step guide */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <h4 className="font-semibold text-gray-800 text-sm mb-2">Guia paso a paso por proveedor</h4>
          <div className="flex gap-1 flex-wrap">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProvider(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeProvider === p.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p.label}
                {p.recommended && <span className="ml-1 text-[10px] opacity-75">(recomendado)</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {activeProvider === "hostinger" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">H</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Hostinger hPanel</p>
                  <p className="text-xs text-gray-500">Panel de control oficial de Hostinger</p>
                </div>
              </div>

              {[
                { n: 1, title: "Accede a hpanel.hostinger.com", desc: "Inicia sesion con tu cuenta.", tip: null },
                { n: 2, title: "Ve a Dominios → DNS", desc: 'Haz click en "Dominios", selecciona tu dominio y luego "DNS / Servidores de nombres".', tip: null },
                { n: 3, title: "Agrega el registro TXT", desc: 'Haz click en "Agregar registro". Tipo: TXT, Nombre: @, Contenido: pega el token de verificacion. Guarda.', tip: 'Si no ves "Nombre", busca "Host" o "Subdominio".' },
                { n: 4, title: "Agrega el registro CNAME", desc: `Haz click en "Agregar registro". Tipo: CNAME, Nombre: ${cnameHost || "www"}, Apunta a: ${FIREBASE_CNAME}. Guarda.`, tip: "Si ya existe un CNAME para ese host, editalo en lugar de crear uno nuevo." },
                { n: 5, title: "Espera y verifica", desc: 'Hostinger suele propagar en 5-30 minutos. Regresa aqui y haz click en "Verificar DNS".', tip: "Verifica la propagacion en dnschecker.org buscando tu dominio con tipo CNAME." },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {step.n}
                  </div>
                  <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                    {step.tip && (
                      <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded mt-1">
                        Tip: {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeProvider === "cloudflare" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CF</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Cloudflare Dashboard</p>
                  <p className="text-xs text-gray-500">Propagacion mas rapida (1-5 min)</p>
                </div>
              </div>

              {[
                { n: 1, title: "Accede a dash.cloudflare.com", desc: "Inicia sesion y selecciona tu dominio." },
                { n: 2, title: 'Ve a "DNS" en el menu lateral', desc: "Encontraras la tabla de registros DNS." },
                { n: 3, title: "Agrega el registro TXT", desc: 'Haz click en "Add record". Tipo: TXT, Name: @, Content: pega el token de verificacion. Save.' },
                { n: 4, title: "Agrega el registro CNAME", desc: `Haz click en "Add record". Tipo: CNAME, Name: ${cnameHost || "www"}, Target: ${FIREBASE_CNAME}. Desactiva el proxy (nube naranja → gris). Save.` },
                { n: 5, title: "Verifica", desc: 'Cloudflare propaga en 1-5 minutos. Regresa aqui y haz click en "Verificar DNS".' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {step.n}
                  </div>
                  <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeProvider === "godaddy" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GD</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">GoDaddy DNS Manager</p>
                  <p className="text-xs text-gray-500">Propagacion 30 min - 24 hrs</p>
                </div>
              </div>

              {[
                { n: 1, title: 'Accede a godaddy.com → Mis Productos', desc: "Inicia sesion y ve a tu nombre de usuario → Mis Productos." },
                { n: 2, title: "Administrar DNS", desc: 'Haz click en el dominio y selecciona "DNS" o "Administrar DNS".' },
                { n: 3, title: "Agrega el TXT de verificacion", desc: 'Haz click en "Agregar". Tipo: TXT, Nombre: @, Valor: pega el token. TTL: 1 hora. Guarda.' },
                { n: 4, title: "Agrega el CNAME", desc: `Haz click en "Agregar". Tipo: CNAME, Nombre: ${cnameHost || "www"}, Valor: ${FIREBASE_CNAME}. Guarda.` },
                { n: 5, title: "Espera y verifica", desc: 'GoDaddy puede tardar 30 min - 24 hrs. Monitorea en dnschecker.org con tipo CNAME. Luego haz click en "Verificar DNS".' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {step.n}
                  </div>
                  <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeProvider === "namecheap" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NC</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Namecheap Advanced DNS</p>
                  <p className="text-xs text-gray-500">Propagacion 15 min - 6 hrs</p>
                </div>
              </div>

              {[
                { n: 1, title: 'Ve a "Domain List"', desc: "Inicia sesion en namecheap.com y ve a Account → Dashboard → Domain List." },
                { n: 2, title: 'Haz click en "Manage"', desc: "Haz click en el boton Manage del dominio." },
                { n: 3, title: 'Ve a "Advanced DNS"', desc: 'Selecciona la pestaña "Advanced DNS".' },
                { n: 4, title: "Agrega el TXT", desc: 'Haz click en "Add New Record". Type: TXT, Host: @, Value: pega el token. TTL: Automatic. Save.' },
                { n: 5, title: "Agrega el CNAME", desc: `Haz click en "Add New Record". Type: CNAME, Host: ${cnameHost || "www"}, Value: ${FIREBASE_CNAME}. Save.` },
                { n: 6, title: "Verifica", desc: 'Espera 15-30 minutos. Verifica en dnschecker.org con tipo CNAME. Luego haz click en "Verificar DNS".' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {step.n}
                  </div>
                  <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Troubleshooting */}
      <details className="border border-gray-200 rounded-xl">
        <summary className="px-5 py-3 text-sm font-semibold cursor-pointer hover:bg-gray-50 rounded-xl">
          Solucion de problemas comunes
        </summary>
        <div className="px-5 pb-4 space-y-3 text-sm">
          <div className="border-l-4 border-red-400 pl-3">
            <p className="font-medium text-red-700">TXT no verificado despues de 1 hora</p>
            <p className="text-xs text-gray-600 mt-0.5">Verifica que el valor TXT sea exactamente igual al token (sin espacios). Comprueba en dnschecker.org buscando tu dominio con tipo TXT.</p>
          </div>
          <div className="border-l-4 border-amber-400 pl-3">
            <p className="font-medium text-amber-700">CNAME no verificado aunque ya lo agregue</p>
            <p className="text-xs text-gray-600 mt-0.5">Confirma que el CNAME apunta exactamente a: <code className="bg-amber-100 px-1 rounded">{FIREBASE_CNAME}</code>. Verifica en dnschecker.org con tipo CNAME. Si usas Cloudflare, asegurate de desactivar el proxy (nube gris).</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-3">
            <p className="font-medium text-blue-700">El dominio no carga mi tienda</p>
            <p className="text-xs text-gray-600 mt-0.5">El CNAME puede estar propagado pero Firebase necesita que registres el dominio personalizado en la consola de Firebase App Hosting. Ve a console.firebase.google.com → App Hosting → tu backend → Dominios → Agregar dominio personalizado.</p>
          </div>
          <div className="border-l-4 border-green-400 pl-3">
            <p className="font-medium text-green-700">SSL/HTTPS no funciona</p>
            <p className="text-xs text-gray-600 mt-0.5">Firebase genera el certificado SSL automaticamente al agregar el dominio en la consola. Puede tardar hasta 24 horas. Si usas Cloudflare con proxy activo, usa modo SSL &quot;Full&quot;.</p>
          </div>
        </div>
      </details>

      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
        {saved ? "✓ Guardado" : "Guardar Dominio"}
      </button>
    </div>
  );
}
