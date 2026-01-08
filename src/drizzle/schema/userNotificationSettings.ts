import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from 'drizzle/schemaHelpers';
import { UserTable } from './user';

export const UserNotificationsSettingsTable = pgTable('user_notifications_settings', {
    userId: varchar()
        .primaryKey()
        .references(() => UserTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
});
