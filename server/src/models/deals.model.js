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

  business_id: integer("business_id")
    .references(() => business.id, { onDelete: "cascade" })
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  quantity: integer("quantity").notNull(),

  image_url: text("image_url"),

  created_at: timestamp("created_at").defaultNow().notNull(),

  expires_at: timestamp("expires_at").notNull(),
});

