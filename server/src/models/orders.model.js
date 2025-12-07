import { integer } from "drizzle-orm/gel-core";
import { serial, varchar } from "drizzle-orm/mysql-core";
import { pgTable } from "drizzle-orm/pg-core";
import { deals } from "./deals.model";


export const orders = pgTable('orders',{
    id: serial('id').primaryKey(),
    deal_id: integer('deal_id').references(()=>deals.id, {onDelete: 'cascade'}),
    //status: varchar('status', {length:255}).default('pending').notNull().check status in pending, collected cancelled
    payment_Method: varchar('payment_method', {length: 20}).default('cash'),
    created_at: timestamp('created_at').defaultNow().notNull(),cr
})