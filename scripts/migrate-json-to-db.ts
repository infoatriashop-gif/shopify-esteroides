/**
 * Migration script: JSON files → PostgreSQL
 *
 * Migrates existing .data/*.json files to PostgreSQL tables.
 * Run with: npx tsx scripts/migrate-json-to-db.ts
 *
 * Prerequisites:
 * 1. DATABASE_URL must be set in .env.local
 * 2. Run `pnpm db:generate && pnpm db:migrate` first to create tables
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  products as productsTable,
  orders as ordersTable,
  adminUsers,
  kvStore,
  dropiOrderSync,
} from "../src/lib/db/schema";

const DATA_DIR = join(process.cwd(), ".data");

function readJson<T>(name: string, defaultValue: T): T {
  const path = join(DATA_DIR, `${name}.json`);
  if (!existsSync(path)) return defaultValue;
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return defaultValue;
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("❌ DATABASE_URL no configurada en .env.local");
    process.exit(1);
  }

  const client = postgres(url);
  const db = drizzle(client);

  console.log("🚀 Iniciando migración de JSON → PostgreSQL...\n");

  // ─── Products ──────────────────────────────────────────────
  const products = readJson<Array<Record<string, unknown>>>("products", []);
  if (products.length > 0) {
    console.log(`📦 Migrando ${products.length} productos...`);
    for (const p of products) {
      try {
        await db.insert(productsTable).values({
          name: String(p.name || ""),
          slug: String(p.slug || `product-${p.id}`),
          description: String(p.description || ""),
          price: Number(p.price) || 0,
          compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
          sku: p.sku ? String(p.sku) : null,
          stock: Number(p.stock) || 0,
          isActive: p.isActive !== false,
          imageUrl: p.imageUrl ? String(p.imageUrl) : null,
          images: (p.images as string[]) || [],
          sellingPoints: (p.sellingPoints as string[]) || [],
          category: String(p.category || "General"),
          quantityOffers: (p.quantityOffers as unknown[]) || [],
          upsells: (p.upsells as unknown[]) || [],
          downsells: (p.downsells as unknown[]) || [],
          formConfig: p.formConfig as Record<string, unknown> || null,
        }).onConflictDoNothing();
      } catch (err) {
        console.error(`  ⚠️ Error migrando producto ${p.id}: ${err}`);
      }
    }
    console.log("  ✅ Productos migrados\n");
  }

  // ─── Orders ────────────────────────────────────────────────
  const orders = readJson<Array<Record<string, unknown>>>("orders", []);
  if (orders.length > 0) {
    console.log(`🛒 Migrando ${orders.length} pedidos...`);
    for (const o of orders) {
      try {
        await db.insert(ordersTable).values({
          orderNumber: String(o.orderNumber || `WC-${o.id}`),
          productId: o.productId ? Number(o.productId) : null,
          productName: String(o.productName || "Producto"),
          quantity: Number(o.quantity) || 1,
          customerName: String(o.customerName || ""),
          customerPhone: String(o.customerPhone || ""),
          department: String(o.department || ""),
          city: String(o.city || ""),
          address: String(o.address || ""),
          notes: String(o.notes || ""),
          subtotal: Number(o.subtotal) || 0,
          shipping: Number(o.shipping) || 0,
          codFee: Number(o.codFee) || 0,
          total: Number(o.total) || 0,
          paymentStatus: String(o.paymentStatus || "pending"),
          shipmentStatus: String(o.shipmentStatus || "unfulfilled"),
          dropiStatus: o.dropiStatus ? String(o.dropiStatus) : null,
          dropiGuideNumber: o.dropiGuideNumber ? String(o.dropiGuideNumber) : null,
          createdAt: o.createdAt ? new Date(String(o.createdAt)) : new Date(),
        }).onConflictDoNothing();
      } catch (err) {
        console.error(`  ⚠️ Error migrando pedido ${o.id}: ${err}`);
      }
    }
    console.log("  ✅ Pedidos migrados\n");
  }

  // ─── Users ─────────────────────────────────────────────────
  const users = readJson<Array<Record<string, unknown>>>("users", []);
  if (users.length > 0) {
    console.log(`👤 Migrando ${users.length} usuarios...`);
    for (const u of users) {
      try {
        await db.insert(adminUsers).values({
          email: String(u.email || ""),
          name: String(u.name || ""),
          passwordHash: String(u.passwordHash || ""),
          role: String(u.role || "admin"),
        }).onConflictDoNothing();
      } catch (err) {
        console.error(`  ⚠️ Error migrando usuario ${u.email}: ${err}`);
      }
    }
    console.log("  ✅ Usuarios migrados\n");
  }

  // ─── Dropi Sync Records ────────────────────────────────────
  const syncRecords = readJson<Array<Record<string, unknown>>>("dropi-sync", []);
  if (syncRecords.length > 0) {
    console.log(`🔄 Migrando ${syncRecords.length} registros de sincronización Dropi...`);
    for (const r of syncRecords) {
      try {
        await db.insert(dropiOrderSync).values({
          orderId: Number(r.orderId) || 0,
          dropiOrderId: r.dropiOrderId ? Number(r.dropiOrderId) : null,
          dropiGuideNumber: r.dropiGuideNumber ? String(r.dropiGuideNumber) : null,
          status: String(r.status || "pending"),
          requestPayload: r.requestPayload
            ? (typeof r.requestPayload === "string" ? JSON.parse(r.requestPayload as string) : r.requestPayload)
            : null,
          responsePayload: r.responsePayload
            ? (typeof r.responsePayload === "string" ? JSON.parse(r.responsePayload as string) : r.responsePayload)
            : null,
          errorMessage: r.errorMessage ? String(r.errorMessage) : null,
          retryCount: Number(r.retryCount) || 0,
          createdAt: r.createdAt ? new Date(String(r.createdAt)) : new Date(),
        });
      } catch (err) {
        console.error(`  ⚠️ Error migrando sync record: ${err}`);
      }
    }
    console.log("  ✅ Registros Dropi migrados\n");
  }

  // ─── KV Store (settings, form-configs, pages, domain-records, etc.) ─
  const kvFiles = [
    "settings",
    "form-configs",
    "domain-records",
    "dropi-logs",
  ];

  for (const name of kvFiles) {
    const data = readJson(name, null);
    if (data !== null) {
      console.log(`📋 Migrando KV: ${name}...`);
      try {
        await db.insert(kvStore).values({
          key: name,
          value: data as Record<string, unknown>,
          updatedAt: new Date(),
        }).onConflictDoNothing();
      } catch (err) {
        console.error(`  ⚠️ Error migrando ${name}: ${err}`);
      }
    }
  }

  // Migrate page editor states (pages-{productId})
  const pageFiles = readJson<string[]>("products", []);
  for (const p of pageFiles) {
    const productId = (p as unknown as { id: number }).id;
    if (!productId) continue;
    const pageData = readJson(`pages-${productId}`, null);
    if (pageData) {
      try {
        await db.insert(kvStore).values({
          key: `pages-${productId}`,
          value: pageData as Record<string, unknown>,
          updatedAt: new Date(),
        }).onConflictDoNothing();
      } catch {
        // ignore
      }
    }
  }

  console.log("\n✅ Migración completada exitosamente!");
  console.log("   Puedes verificar los datos en: pnpm db:studio");

  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error fatal:", err);
  process.exit(1);
});
