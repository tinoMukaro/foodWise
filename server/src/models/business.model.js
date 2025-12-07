import { integer } from "drizzle-orm/gel-core";
import { pgTable } from "drizzle-orm/pg-core";

export const business = pgTable('business',{
    id: serial('id').primaryKey(),
    user_id: integer('user_id').references(()=>users.id, { onDelete: 'cascade' }).notNull(),
    business_name: varchar('name', { length: 155 }).notNull(),
    location: varchar('name', { length: 200 }).notNull(),
    opening_hours: varchar('opening_hours', { length: 150}),
    created_at: timestamp('created_at').defaultNow().notNull()
})

/* 
todo
have to install drizzle-kit
create a db on neon and get a url
complete the tables, check syntax
run db:generate
run db:migrate
*/
