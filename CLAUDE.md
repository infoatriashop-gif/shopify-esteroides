# CLAUDE.md - Shopify Esteroides

## Proyecto
Plataforma e-commerce COD (Cash on Delivery) para dropshipping en Colombia. Next.js 16, TypeScript, Drizzle ORM, PostgreSQL.

## Estándares del Proyecto (siempre aplican)

- Usar **pnpm**, nunca npm
- **TypeScript strict mode** siempre
- UI en **español (Colombia)**
- **Mobile-first** — 80%+ del tráfico es mobile
- Precios COP como **INTEGER sin decimales**
- Validación con **Zod** en client y server
- Nunca exponer tokens/secrets al client
- Todo input sanitizado contra **XSS/SQL injection**
- Formato WooCommerce para Dropi: `WC-{orderNumber}`
- **SHA256** para PII en Facebook CAPI y TikTok Events API
- Teléfonos normalizados a **E.164** antes de procesar
- Nunca modificar schema de DB directamente — usar migraciones Drizzle

## Dev Server
```bash
npx next dev -p 2000
# URL: http://localhost:2000
```

## Arquitectura

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Base de datos | PostgreSQL + Drizzle ORM (fallback JSON) |
| Auth | JWT HS256 (jose) + bcryptjs, httpOnly cookies |
| Middleware | `src/middleware.ts` — protege /admin y /api/* |
| Estilos | Tailwind CSS, design tokens en globals.css |
| Validación | Zod (client + server) |

## Archivos clave

| Archivo | Propósito |
|---|---|
| `src/types/product.ts` | Tipos: Product, QuantityOffer, UpsellConfig, FormConfig |
| `src/lib/services/store.ts` | Store dual-mode (PostgreSQL + JSON fallback) |
| `src/lib/services/dropi.ts` | Cliente Dropi API (multi-country) |
| `src/lib/services/auth.ts` | Auth service (register, login, JWT, rate limiting) |
| `src/middleware.ts` | Protección de rutas |
| `src/app/globals.css` | Design tokens, glass-card, animaciones |
| `src/components/checkout/checkout-page.tsx` | Checkout principal |
| `src/app/(admin)/admin/configuracion/page.tsx` | Settings (general, dominio, dropi, pixels, fraude) |

## Rutas principales

- `/comprar/[slug]` — Storefront checkout con SEO meta tags
- `/admin` — Panel admin (productos, pedidos, configuración, editor)
- `/login`, `/register` — Auth con dark glass card

## Estado del Proyecto

| Fase | Estado |
|---|---|
| 1. Form Builder configurable | ✅ Completo |
| 2. Editor estilo Elementor (13 bloques) | ✅ Completo |
| 3. Integración Dropi API (multi-country) | ✅ Completo |
| 4. Autenticación JWT + middleware | ✅ Completo |
| 5. DNS Verification + mejoras SEO | ✅ Completo |
| 6. Migración PostgreSQL | ✅ Infraestructura completa |
| 7. Rediseño Premium UI/UX | ✅ Completo |

## Design System

- Sidebar siempre dark: `#0E1117` (hardcoded)
- Primary: `#3B82F6` azul · Accent: `#8B5CF6` violeta · Success: `#10B981`
- Solo SVG icons — sin emojis en la UI
- Constantes compartidas: `inputCls`, `labelCls`, `sectionTitle`, `SaveBtn`

## MCP Servers activos

- **Firebase MCP** — `claude mcp add firebase -- npx -y firebase-tools@latest mcp`
  - Cuenta: infoatriashop@gmail.com
  - Firebase App Hosting requiere GitHub; para deploy sin Git usar Vercel CLI

## Agent Team — `.claude/agents/`

| Agente | Enfoque |
|---|---|
| `ux-lead` | Mobile-first, conversión, checkout UX |
| `architect` | Stack, DB schema, deployment, patterns |
| `backend-integrations` | Dropi, pixels CAPI, fraude, webhooks |
| `devils-advocate` | Seguridad, edge cases, cuestionar todo |
| `product-analyst` | Métricas COD, negocio LATAM, conversión |
| `qa-tester` | Tests, flujos E2E |

Comandos: `/team-review` · `/team-build` · `/team-debug`
