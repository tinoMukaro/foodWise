import { numeric, pgTable } from "drizzle-orm/pg-core";
import { business } from "./business.model";
import { integer, text } from "drizzle-orm/gel-core";

export const deals = pgTable('deals',{
    id: serial('id').primaryKey(),
    business_id: integer('business_id').references(()=>business.id, {onDelete: 'cascade'}),
    title: varchar('title', {length: 255}).notNull(),
    description: text('description'),
    //price: numeric(10,2).notNull(),
    quantity: integer('quantity').notNull(),
    image_url: text('image_url'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    expires_at: timestamp('expires_at').notNull(),



})