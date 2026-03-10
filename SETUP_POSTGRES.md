# PostgreSQL Setup Guide

This project uses **Drizzle ORM with PostgreSQL** as the primary database, with **JSON files as fallback** for development.

## Quick Start

### 1. Set Up PostgreSQL Database

**Option A: Docker (Recommended)**
```bash
docker run -d \
  --name shopify-esteroides-db \
  -e POSTGRES_USER=shopify \
  -e POSTGRES_PASSWORD=changeme \
  -e POSTGRES_DB=shopify_esteroides \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B: Local PostgreSQL Installation**
- Install PostgreSQL 15+ from https://www.postgresql.org/download/
- Create a database:
  ```sql
  CREATE DATABASE shopify_esteroides;
  CREATE USER shopify WITH PASSWORD 'changeme';
  GRANT ALL PRIVILEGES ON DATABASE shopify_esteroides TO shopify;
  ```

**Option C: Cloud Database (Railway/Supabase/Neon)**
- Railway: Create PostgreSQL add-on (get CONNECTION_URL from environment variables)
- Supabase: https://supabase.com (free tier available)
- Neon: https://neon.tech (serverless PostgreSQL)

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```bash
# Database
DATABASE_URL=postgresql://shopify:changeme@localhost:5432/shopify_esteroides

# Auth
JWT_SECRET=your-random-base64-string-here

# Other configs (from .env.example)
DROPI_API_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:2000
NODE_ENV=development
```

Generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Generate and Run Migrations

```bash
# Generate migration files from schema
pnpm db:generate

# Run migrations
pnpm db:migrate

# (Optional) View database in UI
pnpm db:studio
```

### 4. Import Existing Data (Optional)

If you have existing JSON data in `.data/` directory:

```bash
pnpm db:import
```

This migrates:
- Products → `products` table
- Orders → `orders` table
- Users → `admin_users` table
- Settings, form configs, etc → `kv_store` table
- Dropi sync records → `dropi_order_sync` table

### 5. Start Development Server

```bash
pnpm dev
# Server runs on http://localhost:2000
```

The app will automatically use PostgreSQL when `DATABASE_URL` is set. Without it, it falls back to JSON files.

## Architecture: Dual-Mode Store

**With DATABASE_URL (Production):**
- All data goes to PostgreSQL
- Drizzle ORM handles queries
- Transactions support for atomic operations (checkout)

**Without DATABASE_URL (Development):**
- Fallback to JSON files in `.data/`
- Same API, no setup required
- Perfect for quick testing without a database

## Key Files

- `src/lib/db/schema/` - Database schema definitions (Drizzle)
- `src/lib/db/index.ts` - Database connection (singleton pattern)
- `src/lib/services/store.ts` - Async dual-mode store service
- `src/middleware.ts` - Authentication middleware (JWT verification)
- `drizzle.config.ts` - Drizzle Kit configuration

## Database Schema

```
products (id, name, slug, price, stock, ...)
orders (id, orderNumber, productId, customerName, ...)
admin_users (id, email, passwordHash, role, ...)
kv_store (key, value) - General key-value store
dropi_order_sync (id, orderId, dropiOrderId, status, ...)
```

## Troubleshooting

**"DATABASE_URL no configurada"**
- Either set `DATABASE_URL` in `.env.local`, or the app will use JSON fallback

**"connection refused"**
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Test: `psql $DATABASE_URL`

**"relation does not exist"**
- Run migrations: `pnpm db:migrate`

**Migration stuck?**
- Reset migrations (dev only): Delete `.migration_lock` and `src/lib/db/migrations/*.sql`
- Regenerate: `pnpm db:generate && pnpm db:migrate`

## Performance Notes

- Checkout uses transactions for atomicity (prevents race conditions)
- HMAC webhook verification for Dropi webhooks
- Rate limiting for login (5 attempts / 15 min)
- Rate limiting for orders (10 / 1 min)

## Next Steps

1. Set up PostgreSQL (choose Option A, B, or C above)
2. Create `.env.local` with DATABASE_URL
3. Run migrations
4. Import existing data (optional)
5. Start dev server: `pnpm dev`
