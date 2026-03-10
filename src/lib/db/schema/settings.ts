import {
  pgTable,
  serial,
  varchar,
  jsonb,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const settings = pgTable(
  "settings",
  {
    id: serial("id").primaryKey(),
    namespace: varchar("namespace", { length: 50 }).notNull(),
    key: varchar("key", { length: 100 }).notNull(),
    value: jsonb("value").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [unique().on(t.namespace, t.key)]
);

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// General-purpose KV store for form-configs, pages, domain-records, etc.
export const kvStore = pgTable("kv_store", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: jsonb("value").notNull().default({}),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
