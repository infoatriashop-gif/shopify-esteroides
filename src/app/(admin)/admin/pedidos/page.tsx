"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { formatCOP } from "@/lib/utils/currency";
import type { Order } from "@/types/product";

/* ── Status config ───────────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  pending:     { label: "Pendiente",   color: "rgba(245,158,11,0.1)",  dot: "#F59E0B" },
  paid:        { label: "Pagado",      color: "rgba(16,185,129,0.1)",  dot: "#10B981" },
  refunded:    { label: "Reembolsado", color: "rgba(239,68,68,0.1)",   dot: "#EF4444" },
  unfulfilled: { label: "Sin enviar",  color: "rgba(100,116,139,0.1)", dot: "#64748B" },
  shipping:    { label: "En camino",   color: "rgba(59,130,246,0.1)",  dot: "#3B82F6" },
  delivered:   { label: "Entregado",   color: "rgba(16,185,129,0.1)",  dot: "#10B981" },
  returned:    { label: "Devuelto",    color: "rgba(239,68,68,0.1)",   dot: "#EF4444" },
};

const inputCls =
  "w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-surface)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-[var(--color-muted)]";

export default function PedidosPage() {
  const [orders, setOrders]               = useState<Order[]>([]);
  const [loading, setLoading]             = useState(true);
  const [statusFilter, setStatusFilter]   = useState("all");
  const [dateFilter, setDateFilter]       = useState("");
  const [searchQuery, setSearchQuery]     = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [syncing, setSyncing]             = useState<number | null>(null);
  const [retrying, setRetrying]           = useState(false);

  const fetchOrders = useCallback(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (statusFilter !== "all") {
      result = result.filter(
        (o) => o.shipmentStatus === statusFilter || o.paymentStatus === statusFilter
      );
    }
    if (dateFilter) result = result.filter((o) => o.createdAt.startsWith(dateFilter));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.orderNumber.toLowerCase().includes(q) ||
          o.productName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, statusFilter, dateFilter, searchQuery]);

  const handleSyncToDropi = async (order: Order) => {
    setSyncing(order.id);
    try {
      await fetch("/api/dropi/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      fetchOrders();
    } finally { setSyncing(null); }
  };

  const handleRetryFailed = async () => {
    setRetrying(true);
    try {
      const res = await fetch("/api/dropi/retry", { method: "POST" });
      const data = await res.json();
      if (data.succeeded > 0) fetchOrders();
    } finally { setRetrying(false); }
  };

  const stats = useMemo(() => ({
    total:     orders.length,
    pending:   orders.filter((o) => o.shipmentStatus === "unfulfilled").length,
    shipping:  orders.filter((o) => o.shipmentStatus === "shipping").length,
    delivered: orders.filter((o) => o.shipmentStatus === "delivered").length,
    returned:  orders.filter((o) => o.shipmentStatus === "returned").length,
    revenue:   orders.filter((o) => o.shipmentStatus === "delivered").reduce((sum, o) => sum + o.total, 0),
  }), [orders]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>Cargando pedidos...</p>
      </div>
    );
  }

  const hasFilters = statusFilter !== "all" || dateFilter || searchQuery;

  return (
    <div className="animate-fade-in space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-foreground)", letterSpacing: "-0.02em" }}>
            Pedidos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
            {orders.length} {orders.length === 1 ? "pedido" : "pedidos"} en total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/orders/export"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-foreground)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar CSV
          </a>
          <button
            onClick={handleRetryFailed}
            disabled={retrying}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B" }}
          >
            {retrying ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {retrying ? "Reintentando..." : "Reintentar fallidos"}
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 stagger">
        {[
          { label: "Total", value: stats.total,     icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",  color: "#64748B", bg: "rgba(100,116,139,0.08)" },
          { label: "Pendientes", value: stats.pending,  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",                                                                                         color: "#F59E0B", bg: "rgba(245,158,11,0.08)"  },
          { label: "En camino",  value: stats.shipping, icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", color: "#3B82F6", bg: "rgba(59,130,246,0.08)"  },
          { label: "Entregados", value: stats.delivered,icon: "M5 13l4 4L19 7",                                                                                                                       color: "#10B981", bg: "rgba(16,185,129,0.08)" },
          { label: "Devueltos",  value: stats.returned, icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6",                                                                                             color: "#EF4444", bg: "rgba(239,68,68,0.08)"  },
          { label: "Ingresos",   value: formatCOP(stats.revenue), icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", isText: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: stat.bg }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={stat.color} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg leading-none" style={{ color: "var(--color-foreground)" }}>
                {stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--color-muted)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
            </svg>
            <input
              type="text"
              placeholder="Buscar cliente, teléfono, pedido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-background)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder-[var(--color-muted)]"
            />
          </div>
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-background)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pago pendiente</option>
            <option value="unfulfilled">Sin enviar</option>
            <option value="shipping">En camino</option>
            <option value="delivered">Entregados</option>
            <option value="returned">Devueltos</option>
          </select>
          {/* Date */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150 border bg-[var(--color-background)] text-[var(--color-foreground)] border-[var(--color-border)] focus:border-blue-500 cursor-pointer"
          />
          {hasFilters && (
            <button
              onClick={() => { setStatusFilter("all"); setDateFilter(""); setSearchQuery(""); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150"
              style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.15)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar
            </button>
          )}
          <p className="text-xs ml-auto" style={{ color: "var(--color-muted)" }}>
            {filteredOrders.length} resultado{filteredOrders.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>
            Historial de Pedidos
          </p>
        </div>
        <table className="w-full" style={{ background: "var(--color-surface)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Pedido", "Cliente", "Ubicación", "Total", "Estado", "Dropi", ""].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-[10px] font-semibold uppercase tracking-widest ${h === "" ? "text-right" : "text-left"} ${h === "Ubicación" ? "hidden md:table-cell" : ""} ${h === "Dropi" ? "hidden lg:table-cell" : ""}`}
                  style={{ color: "var(--color-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--color-border)" }}>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7" style={{ color: "var(--color-muted)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>Sin pedidos</p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                      {hasFilters ? "Ningún pedido coincide con los filtros" : "Los pedidos del checkout COD aparecerán aquí"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => {
                const sc = STATUS_CONFIG[order.shipmentStatus] || { label: order.shipmentStatus, color: "rgba(100,116,139,0.1)", dot: "#64748B" };
                return (
                  <tr
                    key={order.id}
                    className="transition-colors duration-100"
                    style={{ borderBottom: idx < filteredOrders.length - 1 ? "1px solid var(--color-border)" : "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Order # */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold font-mono" style={{ color: "var(--color-foreground)" }}>
                        #{order.orderNumber}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--color-muted)" }}>
                        {new Date(order.createdAt).toLocaleDateString("es-CO")}
                      </p>
                    </td>
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>{order.customerName}</p>
                      <p className="text-[11px] font-mono mt-0.5" style={{ color: "var(--color-muted)" }}>{order.customerPhone}</p>
                    </td>
                    {/* Location */}
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-sm" style={{ color: "var(--color-foreground)" }}>{order.city}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "var(--color-muted)" }}>{order.department}</p>
                    </td>
                    {/* Total */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                        {formatCOP(order.total)}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: sc.color, color: sc.dot }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sc.dot }} />
                        {sc.label}
                      </span>
                    </td>
                    {/* Dropi */}
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {order.dropiGuideNumber ? (
                        <span className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: "rgba(59,130,246,0.08)", color: "#3B82F6" }}>
                          {order.dropiGuideNumber}
                        </span>
                      ) : order.dropiStatus ? (
                        <span className="text-xs" style={{ color: "var(--color-muted)" }}>{order.dropiStatus}</span>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--color-border)" }}>—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer"
                          style={{ background: "rgba(59,130,246,0.08)", color: "#3B82F6" }}
                        >
                          Detalle
                        </button>
                        {!order.dropiStatus && (
                          <button
                            onClick={() => handleSyncToDropi(order)}
                            disabled={syncing === order.id}
                            className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50"
                            style={{ background: "rgba(16,185,129,0.08)", color: "#10B981" }}
                          >
                            {syncing === order.id ? "..." : "→ Dropi"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] overflow-auto rounded-2xl animate-scale-in"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4 sticky top-0"
              style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
            >
              <div>
                <h3 className="text-base font-bold" style={{ color: "var(--color-foreground)" }}>
                  Pedido #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {new Date(selectedOrder.createdAt).toLocaleString("es-CO")}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer"
                style={{ background: "var(--color-border)", color: "var(--color-muted)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              {/* Product */}
              <Section title="Producto">
                <Row label="Nombre"    value={selectedOrder.productName} />
                <Row label="Cantidad"  value={`x${selectedOrder.quantity}`} />
              </Section>

              {/* Customer */}
              <Section title="Cliente">
                <Row label="Nombre"    value={selectedOrder.customerName} />
                <Row label="Teléfono"  value={selectedOrder.customerPhone} />
                <Row label="Dirección" value={selectedOrder.address} />
                <Row label="Ciudad"    value={`${selectedOrder.city}, ${selectedOrder.department}`} />
                {selectedOrder.notes && <Row label="Notas" value={selectedOrder.notes} />}
              </Section>

              {/* Pricing */}
              <Section title="Resumen de pago">
                <Row label="Subtotal"  value={formatCOP(selectedOrder.subtotal)} />
                <Row label="Envío"     value={formatCOP(selectedOrder.shipping)} />
                <Row label="COD Fee"   value={formatCOP(selectedOrder.codFee)} />
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "12px", marginTop: "4px" }}>
                  <Row label="Total"   value={formatCOP(selectedOrder.total)} bold accent />
                </div>
              </Section>

              {/* Status */}
              <Section title="Estados">
                <Row label="Pago"  value={STATUS_CONFIG[selectedOrder.paymentStatus]?.label  || selectedOrder.paymentStatus} />
                <Row label="Envío" value={STATUS_CONFIG[selectedOrder.shipmentStatus]?.label || selectedOrder.shipmentStatus} />
                {selectedOrder.dropiStatus      && <Row label="Dropi" value={selectedOrder.dropiStatus} />}
                {selectedOrder.dropiGuideNumber && <Row label="Guía"  value={selectedOrder.dropiGuideNumber} />}
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 space-y-2.5" style={{ background: "var(--color-background)", border: "1px solid var(--color-border)" }}>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs flex-shrink-0" style={{ color: "var(--color-muted)" }}>{label}</span>
      <span
        className={`text-sm text-right ${bold ? "font-bold" : "font-medium"}`}
        style={{ color: accent ? "#3B82F6" : "var(--color-foreground)" }}
      >
        {value}
      </span>
    </div>
  );
}
