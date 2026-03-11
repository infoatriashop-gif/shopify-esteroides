"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/admin",             label: "Dashboard",     exact: true,  icon: IconDashboard },
  { href: "/admin/productos",   label: "Productos",     exact: false, icon: IconProducts },
  { href: "/admin/pedidos",     label: "Pedidos",       exact: false, icon: IconOrders },
  { href: "/admin/formulario",  label: "Formulario",    exact: false, icon: IconForm },
  { href: "/admin/configuracion", label: "Configuracion", exact: false, icon: IconSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingHref, setPendingHref]   = useState<string | null>(null);
  const [isPending, startTransition]    = useTransition();
  const { theme, toggleTheme }          = useTheme();

  useEffect(() => { setPendingHref(null); }, [pathname]);

  function handleNav(href: string) {
    if (href === pathname) return;
    setPendingHref(href);
    setSidebarOpen(false);
    startTransition(() => router.push(href));
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const currentPage = navItems.find((n) =>
    n.exact ? pathname === n.href : pathname.startsWith(n.href)
  );

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-background)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-[240px] transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0E1117", borderRight: "1px solid #1a2230" }}
      >
        {/* Top gradient line */}
        <div className="h-0.5 topline flex-shrink-0" />

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight tracking-tight">Shopify</p>
            <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
              Esteroides
            </p>
          </div>
        </div>

        {/* Section label */}
        <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#3D4F63" }}>
          Menu Principal
        </p>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive  = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const isLoading = pendingHref === item.href && isPending;
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                disabled={isLoading}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left group cursor-pointer"
                style={{
                  background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                  color: isActive ? "#F1F5F9" : "#64748B",
                }}
              >
                {/* Active indicator */}
                <span
                  className="absolute left-3 w-0.5 h-5 rounded-full transition-all duration-200"
                  style={{
                    background: isActive ? "linear-gradient(180deg,#3B82F6,#8B5CF6)" : "transparent",
                    position: "relative",
                    flexShrink: 0,
                  }}
                />
                {isLoading ? (
                  <svg className="w-4 h-4 animate-spin flex-shrink-0" style={{ color: "#3B82F6" }} fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <item.icon active={isActive} />
                )}
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "#3B82F6" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 my-3" style={{ height: "1px", background: "#1a2230" }} />

        {/* Bottom section */}
        <div className="px-3 pb-5 space-y-1 flex-shrink-0">
          <Link
            href="/product/producto-ejemplo"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer"
            style={{ color: "#64748B" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748B"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="text-xs">Ver tienda</span>
          </Link>

          {/* Version badge */}
          <div className="flex items-center gap-2 px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#10B981" }} />
            <span className="text-[10px] font-mono" style={{ color: "#3D4F63" }}>v0.1.0 · MVP</span>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Progress bar */}
        {isPending && (
          <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 overflow-hidden" style={{ background: "rgba(59,130,246,0.1)" }}>
            <div className="h-full w-1/2 animate-progress rounded-full" style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)" }} />
          </div>
        )}

        {/* ── Top Header ──────────────────────────────────────────────── */}
        <header
          className="flex-shrink-0 h-14 flex items-center justify-between px-6 sticky top-0 z-30"
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left: hamburger + breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: "var(--color-muted)" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span style={{ color: "var(--color-muted)" }}>Admin</span>
              {currentPage && (
                <>
                  <svg className="w-3.5 h-3.5" style={{ color: "var(--color-border)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium" style={{ color: "var(--color-foreground)" }}>
                    {currentPage.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer"
              style={{ color: "var(--color-muted)" }}
              title={theme === "light" ? "Modo oscuro" : "Modo claro"}
            >
              {theme === "light" ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: "#F59E0B" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Divider */}
            <div className="w-px h-5 mx-1" style={{ background: "var(--color-border)" }} />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer"
              style={{ color: "var(--color-muted)" }}
              title="Cerrar sesion"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Page Content ────────────────────────────────────────────── */}
        <main className="flex-1 p-6 max-w-6xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Icon Components ──────────────────────────────────────────────────────── */
function IconDashboard({ active }: { active: boolean }) {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.6}
      style={{ color: active ? "#3B82F6" : "#64748B" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  );
}

function IconProducts({ active }: { active: boolean }) {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.6}
      style={{ color: active ? "#3B82F6" : "#64748B" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function IconOrders({ active }: { active: boolean }) {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.6}
      style={{ color: active ? "#3B82F6" : "#64748B" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function IconForm({ active }: { active: boolean }) {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.6}
      style={{ color: active ? "#3B82F6" : "#64748B" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function IconSettings({ active }: { active: boolean }) {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2 : 1.6}
      style={{ color: active ? "#3B82F6" : "#64748B" }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}
