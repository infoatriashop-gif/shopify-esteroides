import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// Flat orders table matching the current app's Order type
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  productId: integer("product_id"),
  productName: varchar("product_name", { length: 255 }),
  quantity: integer("quantity").notNull().default(1),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  department: varchar("department", { length: 100 }),
  city: varchar("city", { length: 100 }),
  address: text("address"),
  notes: text("notes").default(""),
  subtotal: integer("subtotal").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  codFee: integer("cod_fee").notNull().default(0),
  total: integer("total").notNull().default(0),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending").notNull(),
  shipmentStatus: varchar("shipment_status", { length: 20 }).default("unfulfilled").notNull(),
  dropiStatus: varchar("dropi_status", { length: 50 }),
  dropiGuideNumber: varchar("dropi_guide_number", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
