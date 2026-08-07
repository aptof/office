import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const insightStatus = sqliteTable('insight_status', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
});

export type InsightStatus = typeof insightStatus.$inferSelect;
