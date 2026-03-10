import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { orders } from "./orders";

export const dropiConfig = pgTable("dropi_config", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key").notNull(),
  environment: varchar("environment", { length: 20 }).default("test"), // test, production
  isEnabled: boolean("is_enabled").default(false),
  autoSync: boolean("auto_sync").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dropiProductMap = pgTable("dropi_product_map", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id)
    .unique(),
  dropiProductId: integer("dropi_product_id").notNull(),
  dropiVariationId: integer("dropi_variation_id"),
  dropiProductName: varchar("dropi_product_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dropiOrderSync = pgTable("dropi_order_sync", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  dropiOrderId: integer("dropi_order_id"),
  dropiGuideNumber: varchar("dropi_guide_number", { length: 100 }),
  status: varchar("status", { length: 20 }).default("pending"), // pending, synced, failed
  dropiStatus: varchar("dropi_status", { length: 30 }),
  requestPayload: jsonb("request_payload"),
  responsePayload: jsonb("response_payload"),
  errorMessage: text("error_message"),
  retryCount: integer("retry_count").default(0),
  syncedAt: timestamp("synced_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const dropiProductMapRelations = relations(dropiProductMap, ({ one }) => ({
  product: one(products, {
    fields: [dropiProductMap.productId],
    references: [products.id],
  }),
}));

export const dropiOrderSyncRelations = relations(dropiOrderSync, ({ one }) => ({
  order: one(orders, {
    fields: [dropiOrderSync.orderId],
    references: [orders.id],
  }),
}));
