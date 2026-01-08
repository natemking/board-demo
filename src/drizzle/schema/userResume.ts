import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from 'drizzle/schemaHelpers';
import { UserTable } from './user';


export const UserResumeTable = pgTable('user-resume-table', {
    userId: varchar()
        .primaryKey()
        .references(() => UserTable.id),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey: varchar().notNull(),
    aiSummary: varchar(),
    createdAt,
    updatedAt,
});
