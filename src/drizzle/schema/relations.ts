import { relations } from 'drizzle-orm';
import { JobListingTable } from './jobListing';
import { JobListingApplicationTable } from './jobListingApplication';
import { OrganizationTable } from './organization';
import { OrganizationUserSettingsTable } from './organizationUserSettings';
import { UserTable } from './user';
import { UserNotificationsSettingsTable } from './userNotificationSettings';
import { UserResumeTable } from './userResume';

export const jobListingRelations = relations(JobListingTable, ({ one, many }) => ({
    organization: one(OrganizationTable, {
        fields: [JobListingTable.organizationId],
        references: [OrganizationTable.id],
    }),
    applications: many(JobListingApplicationTable),
}));

export const jobListingApplicationRelations = relations(JobListingApplicationTable, ({ one }) => ({
    jobListing: one(JobListingTable, {
        fields: [JobListingApplicationTable.jobListingId],
        references: [JobListingTable.id],
    }),
    user: one(UserTable, {
        fields: [JobListingApplicationTable.userId],
        references: [UserTable.id],
    }),
}));

export const organizationRelations = relations(OrganizationTable, ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSetting: many(OrganizationUserSettingsTable),
}));

export const organizationUserSettingsRelations = relations(
    OrganizationUserSettingsTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [OrganizationUserSettingsTable.userId],
            references: [UserTable.id],
        }),
        organization: one(OrganizationTable, {
            fields: [OrganizationUserSettingsTable.organizationId],
            references: [OrganizationTable.id],
        }),
    })
);

export const userRelations = relations(UserTable, ({ one, many }) => ({
    notificationSettings: one(UserNotificationsSettingsTable),
    resume: one(UserResumeTable),
    organizationUserSetting: many(OrganizationUserSettingsTable),
}));

export const userNotificationSettingsRelations = relations(
    UserNotificationsSettingsTable,
    ({ one }) => ({
        user: one(UserTable, {
            fields: [UserNotificationsSettingsTable.userId],
            references: [UserTable.id],
        }),
    })
);

export const userResumeRelations = relations(UserResumeTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserResumeTable.userId],
        references: [UserTable.id],
    }),
}));
