import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  numeric,
  timestamp,
  
} from "drizzle-orm/pg-core";
import { users } from "./user.model.js";
import { business } from "./business.model.js";
import { deals } from "./deals.model.js";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  // Foreign Keys
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  dealId: integer("deal_id").references(() => deals.id, { onDelete: "cascade" }).notNull(),
  businessId: integer("business_id").references(() => business.id, { onDelete: "cascade" }).notNull(),

  // Order Details
  quantity: integer("quantity").notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),

  // Order Status
  status: varchar("status", { length: 20 }).default("pending").notNull(),

  // Payment
  paymentMethod: varchar("payment_method", { length: 50 }),

  // Pickup Information
  pickupTime: timestamp("pickup_time", { withTimezone: true }),
  

  // Special Instructions
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Define status constants for consistent usage
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  READY: "ready",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

