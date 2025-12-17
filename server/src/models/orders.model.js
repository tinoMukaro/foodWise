import {
  pgTable,
  serial,
  integer,
  timestamp,
  
} from "drizzle-orm/pg-core";
import { deals } from "./deals.model.js";
import { orderStatusEnum, paymentMethodEnum } from "./enums";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  deal_id: integer("deal_id")
    .references(() => deals.id, { onDelete: "cascade" })
    .notNull(),

  status: orderStatusEnum("status")
    .default("pending")
    .notNull(),

  payment_method: paymentMethodEnum("payment_method")
    .default("cash")
    .notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
