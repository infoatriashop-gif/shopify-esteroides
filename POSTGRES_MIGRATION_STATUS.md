# PostgreSQL Migration - Status Report

**Date:** March 9, 2026
**Status:** 🟢 **PHASE 6 IN PROGRESS** - Core infrastructure complete, ready for database setup

---

## ✅ Completed Work

### 1. Database Schema & ORM Integration
- ✅ Created Drizzle ORM schema files:
  - `src/lib/db/schema/products.ts` - Products with JSONB fields (variants, offers, etc)
  - `src/lib/db/schema/orders.ts` - Flat order structure
  - `src/lib/db/schema/admin-users.ts` - Admin user management
  - `src/lib/db/schema/settings.ts` - KV store + admin users
  - `src/lib/db/schema/dropi-sync.ts` - Dropi sync records
  - `src/lib/db/index.ts` - Singleton pattern with dual-mode support

### 2. Dual-Mode Store Service
- ✅ Async `src/lib/services/store.ts` with:
  - `readStore<T>()` - Returns `Promise<T>`
  - `writeStore<T>()` - Async with `onConflictDoUpdate`
  - Automatic fallback to JSON when `DATABASE_URL` not set
  - Backwards compatibility with sync versions for tests

### 3. Real Authentication Middleware
- ✅ Created `src/middleware.ts` (replaces old proxy pattern):
  - JWT verification with jose library
  - Real Next.js middleware for protected routes
  - Proper httpOnly cookie handling
  - Redirects to `/login` for unauthenticated users
  - API routes return 401 JSON responses

### 4. API Routes Refactored (Dual-Mode)
- ✅ `src/app/api/products/route.ts` - GET/POST with dual-mode
- ✅ `src/app/api/products/[id]/route.ts` - GET/PUT/DELETE with slug lookup
- ✅ `src/app/api/products/[id]/duplicate/route.ts` - Product duplication
- ✅ `src/app/api/orders/route.ts` - Order management with atomic transactions
- ✅ `src/app/api/orders/export/route.ts` - CSV export
- ✅ `src/app/api/checkout/route.ts` - **ATOMIC TRANSACTIONS** for race condition prevention
- ✅ `src/app/api/settings/route.ts` - Settings management
- ✅ `src/app/api/form-config/route.ts` - Form configuration
- ✅ `src/app/api/pages/[productId]/route.ts` - Page editor states
- ✅ `src/app/api/dropi/webhook/route.ts` - HMAC-SHA256 signature verification
- ✅ `src/app/api/dropi/sync/route.ts` - Dropi order sync
- ✅ `src/app/api/dropi/logs/route.ts` - API logging

### 5. Services Layer Async Updates
- ✅ `src/lib/services/auth.ts` - Async `hasUsers()`, `getUsers()`, `register()`, `login()`
- ✅ `src/lib/services/dropi.ts` - All functions async (getSettings, sendOrderToDropi, etc)
- ✅ `src/lib/services/dns-verify.ts` - Async domain verification

### 6. Security Improvements
- ✅ HMAC-SHA256 webhook signature verification (crypto.timingSafeEqual)
- ✅ JWT_SECRET error handling (throws in production if not set)
- ✅ Rate limiting for login (5 attempts / 15 min)
- ✅ Rate limiting for orders (10 / 1 min)
- ✅ httpOnly secure cookies
- ✅ Security headers in next.config.ts

### 7. Build & Compilation
- ✅ **Build passing** - no TypeScript errors
- ✅ Fixed async/await issues in routes (register, dropi/logs)
- ✅ All 30+ routes compiled successfully
- ✅ Dev server running on port 2000

### 8. Documentation
- ✅ Created `SETUP_POSTGRES.md` - Comprehensive PostgreSQL setup guide
- ✅ Created `.env.local.template` - Environment variable template
- ✅ Created migration script `scripts/migrate-json-to-db.ts`

---

## ⏳ Next Steps (User Action Required)

### Step 1: Set Up PostgreSQL Database

Choose ONE option:

**A. Docker (Quickest)**
```bash
docker run -d --name shopify-db \
  -e POSTGRES_USER=shopify \
  -e POSTGRES_PASSWORD=changeme \
  -e POSTGRES_DB=shopify_esteroides \
  -p 5432:5432 \
  postgres:16-alpine
```

**B. Cloud (Recommended for Production)**
- Railway: Add PostgreSQL add-on
- Supabase: Create free database
- Neon: Serverless PostgreSQL

**C. Local Installation**
- Install PostgreSQL 15+ locally
- Create database and user manually

### Step 2: Configure Environment

Copy template and set DATABASE_URL:
```bash
cp .env.local.template .env.local
# Edit .env.local and set DATABASE_URL
```

### Step 3: Generate & Run Migrations

```bash
# Generate migration files from schema
pnpm db:generate

# Run migrations to create tables
pnpm db:migrate

# (Optional) View data in UI
pnpm db:studio
```

### Step 4: Import Existing Data (Optional)

If migrating from JSON files:
```bash
pnpm db:import
```

Migrates:
- `.data/products.json` → products table
- `.data/orders.json` → orders table
- `.data/users.json` → admin_users table
- Settings, form configs, etc → kv_store table

---

## 📊 Current State

| Component | Status | Details |
|-----------|--------|---------|
| **Database Schema** | ✅ Done | All tables defined in Drizzle |
| **Dual-Mode Store** | ✅ Done | Works with/without DATABASE_URL |
| **Middleware** | ✅ Done | Real JWT authentication |
| **API Routes** | ✅ Done | 20+ routes refactored for DB |
| **Checkout Logic** | ✅ Done | Atomic transactions (no race conditions) |
| **Build** | ✅ Passing | No compilation errors |
| **Dev Server** | ✅ Running | http://localhost:2000 |
| **Migrations** | ⏳ Ready | Need DATABASE_URL to generate |
| **Data Import** | ⏳ Ready | Script `pnpm db:import` |
| **Tests** | ⏳ Pending | Need async store updates |

---

## 🎯 Remaining Work

### High Priority (Blocking Production)
- [ ] **Database Setup** - Choose PostgreSQL provider and connect
- [ ] **Run Migrations** - Generate and execute migration files
- [ ] **Test Dual-Mode** - Verify with/without DATABASE_URL

### Medium Priority (Before Launch)
- [ ] **Update Tests** - Fix test files to work with async store
- [ ] **Full Integration Test** - Test all APIs with real database
- [ ] **Dropi Order Sync** - Full testing with real Dropi environment

### Low Priority (Post-Launch)
- [ ] **Facebook CAPI** - Conversion API tracking
- [ ] **TikTok Events API** - Event tracking
- [ ] **Performance Monitoring** - APM setup

---

## 📝 Key Architectural Decisions

1. **Dual-Mode Store**
   - PostgreSQL when `DATABASE_URL` is set
   - JSON fallback when not set
   - Enables dev without database setup

2. **Async/Await First**
   - All store operations are async
   - Supports both DB and file operations uniformly
   - Better for scaling

3. **Atomic Transactions**
   - Checkout uses `db.transaction()` for order + stock changes
   - Eliminates race conditions
   - Single point of truth: database

4. **Middleware over Proxy**
   - Modern Next.js 16 middleware approach
   - Real JWT verification on every request
   - Cleaner security model

5. **HMAC Webhook Verification**
   - Dropi webhooks verified with timing-safe comparison
   - Prevents order spoofing
   - Required for production

---

## 🔍 Testing the Setup

Once PostgreSQL is configured:

```bash
# 1. Check database connection
psql $DATABASE_URL

# 2. Generate migrations
pnpm db:generate

# 3. Run migrations
pnpm db:migrate

# 4. Seed with example data (if migrating from JSON)
pnpm db:import

# 5. Run tests
pnpm test

# 6. Start dev server
pnpm dev
```

Visit http://localhost:2000 and test:
- [ ] Login/Register flow
- [ ] Product CRUD
- [ ] Checkout process
- [ ] Order creation
- [ ] Settings management

---

## 📚 References

- **Drizzle ORM:** https://orm.drizzle.team/
- **PostgreSQL:** https://postgresql.org/
- **Docker:** https://docs.docker.com/get-started/
- **Railway:** https://railway.app/
- **Next.js Middleware:** https://nextjs.org/docs/app/building-your-application/routing/middleware

---

## 💡 Development Tips

**Work Without Database (Using JSON)**
- Skip PostgreSQL setup
- Create `.env.local` with empty DATABASE_URL
- App will use `.data/*.json` files
- Good for quick development

**View Database Data**
```bash
pnpm db:studio
```
Opens UI on http://localhost:5555

**Generate New Migration After Schema Change**
```bash
pnpm db:generate
pnpm db:migrate
```

**Reset Database (Development Only)**
```bash
# ⚠️ WARNING: Deletes all data
pnpm db:drop
pnpm db:migrate
```
