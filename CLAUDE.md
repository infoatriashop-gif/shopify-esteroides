# CLAUDE.md - Shopify Esteroides

## Proyecto
Plataforma e-commerce COD (Cash on Delivery) para dropshipping en Colombia. Next.js 16, TypeScript, Drizzle ORM, JSON fallback (sin PostgreSQL en producción).

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
| Base de datos | JSON fallback (sin PostgreSQL activo en producción) |
| Auth | JWT HS256 (jose) + bcryptjs, httpOnly cookies |
| Middleware | `src/middleware.ts` — protege /admin y /api/* |
| Estilos | Tailwind CSS, design tokens en globals.css |
| Validación | Zod (client + server) |

## Deploy — Firebase App Hosting

- **Proyecto Firebase:** `shopify-esteroides-2026`
- **URL producción:** `https://shopify-esteroides--shopify-esteroides-2026.us-central1.hosted.app`
- **Repo GitHub:** `infoatriashop-gif/shopify-esteroides` (privado, rama `master`)
- **Deploy automático:** cada push a `master` dispara un rollout
- **Deploy manual:** `npx firebase-tools apphosting:rollouts:create shopify-esteroides --project shopify-esteroides-2026 --git-branch master --force`
- **Config:** `apphosting.yaml` en la raíz del proyecto
- **Secrets:** `JWT_SECRET` almacenado en Firebase Secret Manager

## Dominio personalizado — Firebase

Para conectar un dominio propio:
1. El usuario debe agregar **2 registros DNS** (TXT de verificación + CNAME a Firebase)
2. CNAME target: `shopify-esteroides--shopify-esteroides-2026.us-central1.hosted.app`
3. No se usan IPs ni registros A — solo CNAME
4. Después registrar el dominio en Firebase Console → App Hosting → Dominios
5. La verificación DNS se hace en `/admin/configuracion` → tab Dominio

## Archivos clave

| Archivo | Propósito |
|---|---|
| `src/types/product.ts` | Tipos: Product, QuantityOffer, UpsellConfig, FormConfig |
| `src/lib/services/store.ts` | Store dual-mode (PostgreSQL + JSON fallback) |
| `src/lib/services/dropi.ts` | Cliente Dropi API (multi-country) |
| `src/lib/services/auth.ts` | Auth service (register, login, JWT, rate limiting) |
| `src/lib/services/dns-verify.ts` | Verificación DNS real (TXT + CNAME → Firebase) |
| `src/middleware.ts` | Protección de rutas |
| `src/app/globals.css` | Design tokens, glass-card, animaciones |
| `src/components/checkout/checkout-page.tsx` | Checkout principal |
| `src/app/(admin)/admin/configuracion/page.tsx` | Settings (general, dominio, dropi, pixels, fraude) |
| `apphosting.yaml` | Config Firebase App Hosting (Node 20, secrets) |

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
| 6. Migración PostgreSQL | ✅ Infraestructura completa (sin DB activa en prod) |
| 7. Rediseño Premium UI/UX | ✅ Completo |
| 8. Deploy Firebase App Hosting | ✅ Completo |

## Design System

- Sidebar siempre dark: `#0E1117` (hardcoded)
- Primary: `#3B82F6` azul · Accent: `#8B5CF6` violeta · Success: `#10B981`
- Solo SVG icons — sin emojis en la UI
- Constantes compartidas: `inputCls`, `labelCls`, `sectionTitle`, `SaveBtn`

## MCP Servers activos

- **Firebase MCP** — `claude mcp add firebase -- npx -y firebase-tools@latest mcp`
  - Cuenta: infoatriashop@gmail.com
- **GitHub MCP** — token en `~/.claude.json` proyecto `Shopify esteroides`
  - Repo: `infoatriashop-gif/shopify-esteroides`

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
