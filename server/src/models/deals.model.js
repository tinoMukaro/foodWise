import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { business } from "./business.model.js";

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),

  businessId: integer("business_id")
    .references(() => business.id, { onDelete: "cascade" })
    .notNull(),

  title: varchar("title", { length: 150 }).notNull(),

  description: text("description").notNull(),

  originalPrice: numeric("original_price", { precision: 10, scale: 2 }).notNull(),

  dealPrice: numeric("deal_price", { precision: 10, scale: 2 }).notNull(),

  quantityTotal: integer("quantity_total").notNull(),

  quantityLeft: integer("quantity_left").notNull(),

  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

  imageUrl: varchar("image_url", { length: 500 }),

  pickupLocation: varchar("pickup_location", { length: 200 }).notNull(),

  status: varchar("status", { length: 20 }).default("active").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
