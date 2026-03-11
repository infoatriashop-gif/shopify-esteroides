import Link from "next/link";

const kpis = [
  {
    label: "Pedidos Hoy",
    value: "0",
    trend: null,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    label: "Ventas Hoy",
    value: "$0",
    trend: null,
    color: "#10B981",
    bg: "rgba(16,185,129,0.08)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Pedidos Semana",
    value: "0",
    trend: "+0%",
    trendUp: true,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Ventas Semana",
    value: "$0",
    trend: "+0%",
    trendUp: true,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const quickActions = [
  {
    href: "/admin/productos",
    title: "Productos",
    desc: "Gestionar catálogo",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.15)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    href: "/admin/pedidos",
    title: "Pedidos",
    desc: "Ver y gestionar pedidos",
    color: "#10B981",
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.15)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: "/admin/configuracion",
    title: "Configuracion",
    desc: "Dropi, Pixels, Dominio",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.15)",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

const barData = [20, 35, 15, 45, 30, 55, 40];
const barDays = ["L", "M", "X", "J", "V", "S", "D"];

export default function AdminDashboard() {
  const maxBar = Math.max(...barData);

  return (
    <div className="animate-fade-in space-y-7">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-foreground)", letterSpacing: "-0.02em" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
            Resumen de tu tienda COD en tiempo real
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#10B981" }} />
          Colombia · COP
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="animate-fade-in rounded-2xl p-5 transition-all duration-200 cursor-default"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: kpi.bg, color: kpi.color }}
              >
                {kpi.icon}
              </div>
              {kpi.trend && (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: kpi.trendUp ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    color:      kpi.trendUp ? "#10B981" : "#EF4444",
                  }}
                >
                  {kpi.trendUp ? "↑" : "↓"} {kpi.trend}
                </span>
              )}
            </div>
            <p
              className="text-2xl font-bold tracking-tight leading-none mb-1"
              style={{ color: "var(--color-foreground)", letterSpacing: "-0.02em" }}
            >
              {kpi.value}
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
                Ventas por día
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>Últimos 7 días</p>
            </div>
            <div className="flex gap-1">
              {["7D", "30D", "Todo"].map((f, i) => (
                <button
                  key={f}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer"
                  style={
                    i === 0
                      ? { background: "rgba(59,130,246,0.1)", color: "#3B82F6" }
                      : { color: "var(--color-muted)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-2" style={{ height: "120px" }}>
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="flex-1 flex items-end w-full">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(h / maxBar) * 100}%`,
                      minHeight: "4px",
                      background: i === 5
                        ? "linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)"
                        : "var(--color-border)",
                      opacity: i === 5 ? 1 : 0.5,
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium" style={{ color: "var(--color-muted)" }}>
                  {barDays[i]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "var(--color-muted)", opacity: 0.6 }}>
            Los datos se actualizan con cada pedido real
          </p>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--color-foreground)" }}>
            Acciones Rapidas
          </h3>
          <div className="space-y-2">
            {quickActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 group cursor-pointer"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight" style={{ color: "var(--color-foreground)" }}>
                    {item.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>{item.desc}</p>
                </div>
                <svg
                  className="w-4 h-4 ml-auto flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                  style={{ color: item.color, opacity: 0.6 }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
            Pedidos Recientes
          </h3>
          <Link
            href="/admin/pedidos"
            className="text-xs font-medium flex items-center gap-1 transition-colors"
            style={{ color: "#3B82F6" }}
          >
            Ver todos
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div
          className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "var(--color-border)" }}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7" style={{ color: "var(--color-muted)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
            Sin pedidos aun
          </p>
          <p className="text-xs mt-1 max-w-xs" style={{ color: "var(--color-muted)" }}>
            Comparte el link de tu producto para empezar a recibir pedidos
          </p>
          <Link
            href="/product/producto-ejemplo"
            target="_blank"
            className="inline-flex items-center gap-2 mt-5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
            style={{
              background: "rgba(59,130,246,0.1)",
              color: "#3B82F6",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver checkout de ejemplo
          </Link>
        </div>
      </div>
    </div>
  );
}
