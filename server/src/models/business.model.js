import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./user.model.js";

export const business = pgTable("business", {
  id: serial("id").primaryKey(),

  user_id: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  business_name: varchar("business_name", { length: 155 }).notNull(),

  location: varchar("location", { length: 200 }).notNull(),

  opening_hours: varchar("opening_hours", { length: 150 }),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
