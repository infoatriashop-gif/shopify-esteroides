import Link from "next/link";

const stats = [
  { label: "Pedidos Hoy", value: "0", trend: null, icon: "🛒" },
  { label: "Ventas Hoy", value: "$0", trend: null, icon: "💰" },
  { label: "Pedidos Semana", value: "0", trend: "+0%", trendUp: true, icon: "📈" },
  { label: "Ventas Semana", value: "$0", trend: "+0%", trendUp: true, icon: "💵" },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-400">Resumen de tu tienda COD</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Colombia 🇨🇴
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              {stat.trend && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.trendUp
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Ventas Últimos 7 Días</h3>
          <div className="flex gap-1">
            {["7D", "30D", "Todo"].map((f) => (
              <button
                key={f}
                className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                  f === "7D"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-2 h-32">
          {[20, 35, 15, 45, 30, 55, 40].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${h}%`, minHeight: 4 }}
              />
              <span className="text-[10px] text-gray-400">
                {["L", "M", "X", "J", "V", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-300 mt-3">
          Los datos aparecerán cuando lleguen pedidos reales
        </p>
      </div>

      {/* Quick Actions */}
      <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/admin/productos",
            icon: "📦",
            title: "Productos",
            desc: "Gestionar catálogo",
            color: "from-blue-50 to-indigo-50",
            border: "hover:border-blue-200",
          },
          {
            href: "/admin/pedidos",
            icon: "🛒",
            title: "Pedidos",
            desc: "Ver y gestionar pedidos",
            color: "from-green-50 to-emerald-50",
            border: "hover:border-green-200",
          },
          {
            href: "/admin/configuracion",
            icon: "⚙️",
            title: "Configuración",
            desc: "Dropi, Pixels, Envío",
            color: "from-purple-50 to-pink-50",
            border: "hover:border-purple-200",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bg-gradient-to-br ${item.color} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent ${item.border}`}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pedidos Recientes</h3>
        <Link
          href="/admin/pedidos"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Ver todos →
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-3 opacity-30">🛒</div>
        <p className="font-medium text-gray-500">No hay pedidos aún</p>
        <p className="text-sm text-gray-400 mt-1">
          Comparte el link de tu producto para empezar a recibir pedidos
        </p>
        <Link
          href="/product/producto-ejemplo"
          target="_blank"
          className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ver checkout de ejemplo
        </Link>
      </div>
    </div>
  );
}
