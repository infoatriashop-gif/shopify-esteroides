import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  inet,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";

// Volume discounts: "2 unidades $45,000 c/u (10% desc)"
export const codQuantityOffers = pgTable("cod_quantity_offers", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  discountType: varchar("discount_type", { length: 10 }).notNull(), // percent, fixed
  discountValue: integer("discount_value").notNull(),
  label: varchar("label", { length: 255 }), // "2 unidades"
  badgeText: varchar("badge_text", { length: 50 }), // "Más Popular"
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

// Upsells: pre and post purchase
export const codUpsells = pgTable("cod_upsells", {
  id: serial("id").primaryKey(),
  triggerProductId: integer("trigger_product_id")
    .notNull()
    .references(() => products.id),
  offerProductId: integer("offer_product_id")
    .notNull()
    .references(() => products.id),
  upsellType: varchar("upsell_type", { length: 10 }).notNull(), // pre, post
  headline: varchar("headline", { length: 255 }),
  description: text("description"),
  discountPercent: integer("discount_percent").default(0),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

// Fraud: blocked users
export const codBlockedUsers = pgTable("cod_blocked_users", {
  id: serial("id").primaryKey(),
  blockType: varchar("block_type", { length: 10 }).notNull(), // phone, email, ip
  blockValue: varchar("block_value", { length: 255 }).notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Fraud: rate limiting
export const codOrderAttempts = pgTable("cod_order_attempts", {
  id: serial("id").primaryKey(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  ipAddress: inet("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Abandoned orders for retargeting
export const codAbandonedOrders = pgTable("cod_abandoned_orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  customerName: varchar("customer_name", { length: 255 }),
  customerPhone: varchar("customer_phone", { length: 20 }),
  cartTotal: integer("cart_total"),
  ipAddress: inet("ip_address"),
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const codQuantityOffersRelations = relations(codQuantityOffers, ({ one }) => ({
  product: one(products, {
    fields: [codQuantityOffers.productId],
    references: [products.id],
  }),
}));

export const codUpsellsRelations = relations(codUpsells, ({ one }) => ({
  triggerProduct: one(products, {
    fields: [codUpsells.triggerProductId],
    references: [products.id],
    relationName: "triggerProduct",
  }),
  offerProduct: one(products, {
    fields: [codUpsells.offerProductId],
    references: [products.id],
    relationName: "offerProduct",
  }),
}));
