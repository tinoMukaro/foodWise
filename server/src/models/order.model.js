import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  numeric,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./user.model.js";
import { business } from "./business.model.js";
import { deals } from "./deal.model.js";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  // Foreign Keys
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  dealId: integer("deal_id")
    .references(() => deals.id, { onDelete: "cascade" })
    .notNull(),

  businessId: integer("business_id")
    .references(() => business.id, { onDelete: "cascade" })
    .notNull(),

  // Order Details
  quantity: integer("quantity").notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),

  // Order Status
  status: varchar("status", { length: 20 })
    .default("pending")
    .notNull(),

  // Payment
  paymentStatus: varchar("payment_status", { length: 20 })
    .default("pending")
    .notNull(),

  paymentMethod: varchar("payment_method", { length: 50 }),
  transactionId: varchar("transaction_id", { length: 100 }),

  // Pickup Information
  pickupCode: varchar("pickup_code", { length: 10 }).notNull(),
  pickupTime: timestamp("pickup_time", { withTimezone: true }),
  actualPickupTime: timestamp("actual_pickup_time", { withTimezone: true }),

  // Special Instructions
  specialInstructions: text("special_instructions"),

  // Metadata
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Define status constants for consistent usage
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  READY: "ready",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};