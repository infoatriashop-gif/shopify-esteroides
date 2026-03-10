"use client";

import { useState, useEffect, useCallback } from "react";

type TabId = "general" | "dominio" | "dropi" | "pixels" | "fraude";

type AllSettings = {
  general: {
    storeName: string;
    currency: string;
    shippingFee: number;
    codFee: number;
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
  general: { storeName: "Mi Tienda COD", currency: "COP", shippingFee: 12000, codFee: 5000 },
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

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "general", label: "General", icon: "🏪" },
    { id: "dominio", label: "Dominio", icon: "🌐" },
    { id: "dropi", label: "Dropi", icon: "🚚" },
    { id: "pixels", label: "Pixels", icon: "📊" },
    { id: "fraude", label: "Anti-Fraude", icon: "🛡️" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Configuracion</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
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

  async function handleSave() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Configuracion General</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Tienda</label>
          <input
            type="text"
            value={values.storeName}
            onChange={(e) => onChange({ ...values, storeName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
          <input type="text" value={values.currency} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
          <p className="text-xs text-gray-400 mt-1">Solo COP en v1 (Colombia)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cargo por envio (COP)</label>
          <input
            type="number"
            value={values.shippingFee}
            onChange={(e) => onChange({ ...values, shippingFee: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cargo COD (COP)</label>
          <input
            type="number"
            value={values.codFee}
            onChange={(e) => onChange({ ...values, codFee: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        {saved ? "✓ Guardado" : "Guardar Cambios"}
      </button>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Integracion Dropi</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.enabled}
            onChange={(e) => onChange({ ...values, enabled: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">Habilitado</span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
          <select
            value={values.environment}
            onChange={(e) => onChange({ ...values, environment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="test">Test (test-api.dropi.co)</option>
            <option value="production">Produccion (api.dropi.co)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
          <input
            type="password"
            value={values.apiKey}
            onChange={(e) => onChange({ ...values, apiKey: e.target.value })}
            placeholder="Token del dashboard de Dropi"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={values.autoSync}
          onChange={(e) => onChange({ ...values, autoSync: e.target.checked })}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm">Sincronizar pedidos automaticamente al crear</span>
      </label>
      <div className="flex items-center gap-3">
        <button onClick={handleTest} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          Probar Conexion
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {saved ? "✓ Guardado" : "Guardar"}
        </button>
        {testResult === "testing" && <span className="text-sm text-gray-500">Probando...</span>}
        {testResult?.startsWith("success:") && <span className="text-sm text-green-600">✓ {testResult.split(":")[1]}</span>}
        {testResult?.startsWith("error:") && <span className="text-sm text-red-600">✗ {testResult.split(":")[1]}</span>}
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-400">
          Webhook URL: <code className="bg-gray-100 px-1 py-0.5 rounded">{typeof window !== "undefined" ? window.location.origin : "https://tu-dominio.com"}/api/dropi/webhook</code>
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

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Tracking Pixels</h3>
      {/* Facebook */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📘</span>
            <h4 className="font-semibold">Facebook Pixel + CAPI</h4>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.fbEnabled}
              onChange={(e) => onChange({ ...values, fbEnabled: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Activo</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel ID</label>
            <input
              type="text"
              value={values.fbPixelId}
              onChange={(e) => onChange({ ...values, fbPixelId: e.target.value })}
              placeholder="123456789012345"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Token (CAPI)</label>
            <input
              type="password"
              value={values.fbAccessToken}
              onChange={(e) => onChange({ ...values, fbAccessToken: e.target.value })}
              placeholder="EAAxxxxxxx (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Eventos: PageView, ViewContent, InitiateCheckout, Purchase</p>
      </div>
      {/* TikTok */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <h4 className="font-semibold">TikTok Pixel</h4>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.tiktokEnabled}
              onChange={(e) => onChange({ ...values, tiktokEnabled: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Activo</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel ID</label>
            <input
              type="text"
              value={values.tiktokPixelId}
              onChange={(e) => onChange({ ...values, tiktokPixelId: e.target.value })}
              placeholder="ABCDEF123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Token (Events API)</label>
            <input
              type="password"
              value={values.tiktokAccessToken}
              onChange={(e) => onChange({ ...values, tiktokAccessToken: e.target.value })}
              placeholder="Token (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Eventos: PageView, ViewContent, InitiateCheckout, CompletePayment</p>
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        {saved ? "✓ Guardado" : "Guardar Configuracion de Pixels"}
      </button>
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
      <h3 className="text-lg font-semibold">Prevencion de Fraude</h3>
      <div>
        <h4 className="font-medium mb-3">Rate Limiting (24 horas)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max pedidos por IP</label>
            <input
              type="number"
              value={values.maxOrdersPerIpPerHour}
              onChange={(e) => onChange({ ...values, maxOrdersPerIpPerHour: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max pedidos por telefono</label>
            <input
              type="number"
              value={values.maxOrdersPerPhonePerDay}
              onChange={(e) => onChange({ ...values, maxOrdersPerPhonePerDay: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max pedidos por email</label>
            <input
              type="number"
              value={values.maxOrdersPerEmailPerDay}
              onChange={(e) => onChange({ ...values, maxOrdersPerEmailPerDay: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium mb-3">Lista Negra</h4>
        <div className="flex gap-2 mb-4">
          <select
            value={newBlock.type}
            onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="phone">Telefono</option>
            <option value="ip">IP</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            value={newBlock.value}
            onChange={(e) => setNewBlock({ ...newBlock, value: e.target.value })}
            placeholder={newBlock.type === "phone" ? "3001234567" : newBlock.type === "ip" ? "192.168.1.1" : "email@ejemplo.com"}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newBlock.reason}
            onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })}
            placeholder="Razon (opcional)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={addBlock} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Bloquear
          </button>
        </div>
        {values.blockedUsers.length === 0 ? (
          <p className="text-sm text-gray-400">No hay usuarios bloqueados</p>
        ) : (
          <div className="space-y-2">
            {values.blockedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-red-50 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium uppercase">{user.type}</span>
                  <span className="text-sm font-mono">{user.value}</span>
                  {user.reason && <span className="text-xs text-gray-500">— {user.reason}</span>}
                </div>
                <button onClick={() => removeBlock(user.id)} className="text-xs text-red-500 hover:underline">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        {saved ? "✓ Guardado" : "Guardar Configuracion"}
      </button>
    </div>
  );
}

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
  const [txtToken, setTxtToken] = useState<string | null>(null);

  const appDomain = typeof window !== "undefined" ? window.location.host : "tu-app.railway.app";
  const appIp = "Usa el IP de tu servidor Railway/VPS";

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
    try {
      const res = await fetch("/api/domains/verify-dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: values.customDomain, action: "verify" }),
      });
      const data = await res.json();
      setDnsStatus(data.status);
      if (data.status === "active") {
        onChange({ ...values, verified: true });
      }
    } catch {
      setDnsStatus("error");
    } finally {
      setChecking(false);
    }
  }

  const statusBadge = (status: string | null) => {
    const map: Record<string, { label: string; cls: string }> = {
      pending: { label: "Pendiente", cls: "bg-yellow-100 text-yellow-700" },
      txt_verified: { label: "TXT Verificado", cls: "bg-blue-100 text-blue-700" },
      active: { label: "Activo", cls: "bg-green-100 text-green-700" },
      error: { label: "Error", cls: "bg-red-100 text-red-700" },
    };
    const s = map[status || ""] || map.pending;
    return <span className={`text-xs px-2 py-0.5 rounded font-medium ${s.cls}`}>{s.label}</span>;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Dominio Personalizado</h3>
      <p className="text-sm text-gray-500">
        Conecta tu propio dominio para que tus paginas de checkout se vean profesionales.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tu dominio personalizado</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={values.customDomain}
            onChange={(e) => {
              onChange({ ...values, customDomain: e.target.value.toLowerCase().replace(/[^a-z0-9.-]/g, ""), verified: false });
              setDnsStatus(null);
              setTxtToken(null);
            }}
            placeholder="tienda.tudominio.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!txtToken ? (
            <button
              onClick={handleAddDomain}
              disabled={!values.customDomain}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Configurar
            </button>
          ) : (
            <button
              onClick={handleVerify}
              disabled={!values.customDomain || checking}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {checking ? "Verificando..." : "Verificar DNS"}
            </button>
          )}
        </div>
        {dnsStatus && (
          <div className="mt-2 flex items-center gap-2">
            {statusBadge(dnsStatus)}
            {values.verified && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dominio verificado
              </span>
            )}
          </div>
        )}
      </div>

      {values.customDomain && txtToken && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">
          <h4 className="font-semibold text-blue-900 mb-3">Configuracion DNS requerida</h4>
          <p className="text-sm text-blue-700 mb-4">
            Ve al panel de tu proveedor de dominio y agrega estos registros en orden:
          </p>

          <div className="space-y-3">
            {/* Step 1: TXT Record */}
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">PASO 1 — TXT</span>
                <span className="text-xs text-gray-400">Verificacion de propiedad</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Tipo</span>
                  <code className="font-mono font-bold">TXT</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Nombre / Host</span>
                  <code className="font-mono font-bold">@</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Valor</span>
                  <code className="font-mono font-bold text-purple-600 text-xs break-all">{txtToken}</code>
                </div>
              </div>
            </div>

            {/* Step 2: CNAME Record */}
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">PASO 2 — CNAME</span>
                <span className="text-xs text-gray-400">Recomendado para subdominios</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Tipo</span>
                  <code className="font-mono font-bold">CNAME</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Nombre / Host</span>
                  <code className="font-mono font-bold">{values.customDomain.split(".")[0]}</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Valor / Apunta a</span>
                  <code className="font-mono font-bold text-blue-600">{appDomain}</code>
                </div>
              </div>
            </div>

            {/* Step 2 Alt: A Record */}
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">PASO 2 ALT — A</span>
                <span className="text-xs text-gray-400">Si usas dominio raiz (@)</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Tipo</span>
                  <code className="font-mono font-bold">A</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Nombre / Host</span>
                  <code className="font-mono font-bold">@</code>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Valor / IP</span>
                  <code className="font-mono font-bold text-blue-600">{appIp}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Provider-specific instructions */}
          <div className="mt-4 space-y-2">
            <h5 className="text-sm font-semibold text-blue-900">Instrucciones por proveedor:</h5>
            <details className="bg-white rounded-lg border border-blue-100 p-3">
              <summary className="text-sm font-medium cursor-pointer text-blue-700">Cloudflare</summary>
              <ol className="text-xs text-gray-600 mt-2 space-y-1 list-decimal list-inside">
                <li>Ve a tu dominio en Cloudflare Dashboard</li>
                <li>Click en &quot;DNS&quot; en el menu lateral</li>
                <li>Click &quot;Add record&quot; y agrega el TXT primero</li>
                <li>Luego agrega el CNAME con proxy activado (nube naranja)</li>
                <li>Vuelve aqui y haz click en &quot;Verificar DNS&quot;</li>
              </ol>
            </details>
            <details className="bg-white rounded-lg border border-blue-100 p-3">
              <summary className="text-sm font-medium cursor-pointer text-blue-700">GoDaddy</summary>
              <ol className="text-xs text-gray-600 mt-2 space-y-1 list-decimal list-inside">
                <li>Ve a &quot;Mis Productos&quot; → selecciona tu dominio</li>
                <li>Click en &quot;DNS&quot; o &quot;Administrar DNS&quot;</li>
                <li>Click &quot;Agregar&quot; para crear el registro TXT</li>
                <li>Espera 5-10 minutos y agrega el CNAME</li>
                <li>Vuelve aqui y haz click en &quot;Verificar DNS&quot;</li>
              </ol>
            </details>
            <details className="bg-white rounded-lg border border-blue-100 p-3">
              <summary className="text-sm font-medium cursor-pointer text-blue-700">Namecheap</summary>
              <ol className="text-xs text-gray-600 mt-2 space-y-1 list-decimal list-inside">
                <li>Ve a Domain List → click &quot;Manage&quot; en tu dominio</li>
                <li>Click en &quot;Advanced DNS&quot;</li>
                <li>Click &quot;Add New Record&quot; para el TXT</li>
                <li>Agrega el CNAME record</li>
                <li>Espera propagacion y verifica aqui</li>
              </ol>
            </details>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Nota:</strong> Los cambios de DNS pueden tardar hasta 48 horas en propagarse.
              Si usas Cloudflare, la propagacion es casi inmediata.
            </p>
          </div>
        </div>
      )}

      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        {saved ? "✓ Guardado" : "Guardar Dominio"}
      </button>
    </div>
  );
}
