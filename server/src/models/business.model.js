import { pgTable,serial, varchar, timestamp, text } from "drizzle-orm/pg-core";



export const business = pgTable("business", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    type: varchar("type").notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    phone: varchar("phone").notNull(),
    phone2: varchar("phone2"),
    location: varchar("location").notNull(),
    openingHours: varchar("opening_hours").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})
 