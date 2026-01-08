import { boolean, integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from 'drizzle/schemaHelpers';
import { OrganizationTable } from './organization';
import { UserTable } from './user';


export const OrganizationUserSettingsTable = pgTable(
    'organization_user_settings',
    {
        userId: varchar()
            .notNull()
            .references(() => UserTable.id),
        organizationId: varchar()
            .notNull()
            .references(() => OrganizationTable.id),
        newApplicationEmailNotifications: boolean().notNull().default(false),
        minimumRating: integer(),
        createdAt,
        updatedAt,
    },
    table => [primaryKey({ columns: [table.userId, table.organizationId] })]
);


