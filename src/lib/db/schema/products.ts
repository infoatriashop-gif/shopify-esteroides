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

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").default(""),
  price: integer("price").notNull(), // COP integer
  compareAtPrice: integer("compare_at_price"),
  sku: varchar("sku", { length: 100 }),
  stock: integer("stock").default(100),
  isActive: boolean("is_active").default(true),
  imageUrl: text("image_url"),
  images: jsonb("images").$type<string[]>().default([]),
  sellingPoints: jsonb("selling_points").$type<string[]>().default([]),
  category: varchar("category", { length: 100 }).default("General"),
  quantityOffers: jsonb("quantity_offers").$type<unknown[]>().default([]),
  upsells: jsonb("upsells").$type<unknown[]>().default([]),
  downsells: jsonb("downsells").$type<unknown[]>().default([]),
  formConfig: jsonb("form_config"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }),
  price: integer("price"),
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  quantityOffers: many(codQuantityOffers),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

// Forward reference — defined in cod.ts but needed here for relations
import { codQuantityOffers } from "./cod";
