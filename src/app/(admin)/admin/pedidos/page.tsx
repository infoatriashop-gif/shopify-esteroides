"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { formatCOP } from "@/lib/utils/currency";
import type { Order } from "@/types/product";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  refunded: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  unfulfilled: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  shipping: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  returned: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  refunded: "Reembolsado",
  unfulfilled: "Sin enviar",
  shipping: "En camino",
  delivered: "Entregado",
  returned: "Devuelto",
};

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [syncing, setSyncing] = useState<number | null>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchOrders = useCallback(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (statusFilter !== "all") {
      result = result.filter(
        (o) => o.shipmentStatus === statusFilter || o.paymentStatus === statusFilter
      );
    }

    if (dateFilter) {
      result = result.filter((o) => o.createdAt.startsWith(dateFilter));
    }

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
    } finally {
      setSyncing(null);
    }
  };

  const handleRetryFailed = async () => {
    setRetrying(true);
    try {
      const res = await fetch("/api/dropi/retry", { method: "POST" });
      const data = await res.json();
      if (data.succeeded > 0) fetchOrders();
    } finally {
      setRetrying(false);
    }
  };

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter((o) => o.shipmentStatus === "unfulfilled").length,
    shipping: orders.filter((o) => o.shipmentStatus === "shipping").length,
    delivered: orders.filter((o) => o.shipmentStatus === "delivered").length,
    returned: orders.filter((o) => o.shipmentStatus === "returned").length,
    revenue: orders.filter((o) => o.shipmentStatus === "delivered").reduce((sum, o) => sum + o.total, 0),
  }), [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pedidos</h2>
        <div className="flex gap-2">
          <a
            href="/api/orders/export"
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Exportar CSV
          </a>
          <button
            onClick={handleRetryFailed}
            disabled={retrying}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {retrying ? "Reintentando..." : "Reintentar fallidos"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total", count: stats.total, color: "bg-gray-50 dark:bg-gray-800" },
          { label: "Pendientes", count: stats.pending, color: "bg-yellow-50 dark:bg-yellow-900/20" },
          { label: "En camino", count: stats.shipping, color: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Entregados", count: stats.delivered, color: "bg-green-50 dark:bg-green-900/20" },
          { label: "Devueltos", count: stats.returned, color: "bg-red-50 dark:bg-red-900/20" },
          { label: "Ingresos", count: formatCOP(stats.revenue), color: "bg-purple-50 dark:bg-purple-900/20", isText: true },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-3 text-center`}>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {"isText" in stat ? stat.count : stat.count}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar cliente, teléfono, pedido..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pago pendiente</option>
          <option value="unfulfilled">Sin enviar</option>
          <option value="shipping">En camino</option>
          <option value="delivered">Entregados</option>
          <option value="returned">Devueltos</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {(statusFilter !== "all" || dateFilter || searchQuery) && (
          <button
            onClick={() => { setStatusFilter("all"); setDateFilter(""); setSearchQuery(""); }}
            className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Pedido</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Cliente</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Ubicación</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Estado</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">Dropi</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="font-medium">No hay pedidos</p>
                  <p className="text-sm mt-1">Los pedidos del checkout COD aparecerán aquí</p>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100">#{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("es-CO")}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-gray-100">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                    {order.city}, {order.department}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCOP(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.shipmentStatus] || "bg-gray-100 dark:bg-gray-800"}`}>
                      {STATUS_LABELS[order.shipmentStatus] || order.shipmentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {order.dropiGuideNumber ? (
                      <span className="text-xs text-blue-600 dark:text-blue-400">{order.dropiGuideNumber}</span>
                    ) : order.dropiStatus ? (
                      <span className="text-xs text-gray-400">{order.dropiStatus}</span>
                    ) : (
                      <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Detalle
                      </button>
                      {!order.dropiStatus && (
                        <button
                          onClick={() => handleSyncToDropi(order)}
                          disabled={syncing === order.id}
                          className="text-xs text-green-600 dark:text-green-400 hover:underline disabled:opacity-50"
                        >
                          {syncing === order.id ? "Enviando..." : "Enviar Dropi"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Pedido #{selectedOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Producto" value={`${selectedOrder.productName} x${selectedOrder.quantity}`} />
              <Row label="Cliente" value={selectedOrder.customerName} />
              <Row label="Teléfono" value={selectedOrder.customerPhone} />
              <Row label="Dirección" value={selectedOrder.address} />
              <Row label="Ciudad" value={`${selectedOrder.city}, ${selectedOrder.department}`} />
              {selectedOrder.notes && <Row label="Notas" value={selectedOrder.notes} />}
              <hr className="border-gray-200 dark:border-gray-700" />
              <Row label="Subtotal" value={formatCOP(selectedOrder.subtotal)} />
              <Row label="Envío" value={formatCOP(selectedOrder.shipping)} />
              <Row label="COD Fee" value={formatCOP(selectedOrder.codFee)} />
              <Row label="Total" value={formatCOP(selectedOrder.total)} bold />
              <hr className="border-gray-200 dark:border-gray-700" />
              <Row label="Estado pago" value={STATUS_LABELS[selectedOrder.paymentStatus] || selectedOrder.paymentStatus} />
              <Row label="Estado envío" value={STATUS_LABELS[selectedOrder.shipmentStatus] || selectedOrder.shipmentStatus} />
              {selectedOrder.dropiStatus && <Row label="Estado Dropi" value={selectedOrder.dropiStatus} />}
              {selectedOrder.dropiGuideNumber && <Row label="Guía Dropi" value={selectedOrder.dropiGuideNumber} />}
              <Row label="Fecha" value={new Date(selectedOrder.createdAt).toLocaleString("es-CO")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className={`text-gray-900 dark:text-gray-100 ${bold ? "font-bold" : ""}`}>{value}</span>
    </div>
  );
}
