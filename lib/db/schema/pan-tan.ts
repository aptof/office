import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, AnySQLiteColumn } from 'drizzle-orm/sqlite-core';
import { everificationCase } from './insight-everification';

export const panTan = sqliteTable('pan_tan', {
  pan: text('pan').primaryKey(),
  name: text('name').notNull(),
  isPan: integer('is_pan', { mode: 'boolean' }).notNull().default(true),
  linked: text('linked').references((): AnySQLiteColumn => panTan.pan),
});

export type PanTan = typeof panTan.$inferSelect;

export const panTanRelations = relations(panTan, ({ one, many }) => ({
  pan: one(panTan, {
    fields: [panTan.linked],
    references: [panTan.pan],
    relationName: 'linked_pans',
  }),

  tans: many(panTan, {
    relationName: 'linked_pans',
  }),

  everificationsCases: many(everificationCase),
}));
