import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { panTan } from './pan-tan';

export const everificationCaseType = sqliteTable('everification_case_type', {
  id: integer('id').primaryKey(),
  type: text('type').notNull(),
});

export const everificationCaseTypeRelations = relations(everificationCaseType, ({ many }) => ({
  cases: many(everificationCase),
}));

export const everificationCase = sqliteTable('everification_case', {
  panTan: text('pan_tan')
    .notNull()
    .references(() => panTan.pan),
  typeId: integer('type_id')
    .notNull()
    .references(() => everificationCaseType.id),
  year: integer('year').notNull(),
  statusId: text('status_id')
    .notNull()
    .references(() => everificationCaseStatus.id),
  id: text('id').primaryKey(),
});

export const everificationCaseRelations = relations(everificationCase, ({ one }) => ({
  panTan: one(panTan, {
    fields: [everificationCase.panTan],
    references: [panTan.pan],
  }),

  caseType: one(everificationCaseType, {
    fields: [everificationCase.typeId],
    references: [everificationCaseType.id],
  }),

  status: one(everificationCaseStatus, {
    fields: [everificationCase.statusId],
    references: [everificationCaseStatus.id],
  }),
}));

export const everificationCaseStatus = sqliteTable('everification_case_status', {
  id: text('id').primaryKey(),
  description: text('description').notNull(),
});

export const everificationCaseStatusRelations = relations(everificationCaseStatus, ({ many }) => ({
  cases: many(everificationCase),
}));
