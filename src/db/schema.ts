import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  createTs: timestamp('create_ts').defaultNow().notNull(),
  user_id: text('user_id').notNull(),
  description: text('description').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  status: text('status').notNull(),
  value: text('value').notNull(),
});