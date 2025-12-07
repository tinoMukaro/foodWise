import { pgTable, serial,varchar,timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone',{length: 30}).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),

})