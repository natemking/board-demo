import { db } from 'drizzle/db';
import { UserNotificationsSettingsTable } from 'drizzle/schema';
import { revalidateUserNotificationsSettingsCache } from 'db/cache/userNotificationsSettings';

export async function insertUserNotificationsSettings(
    settings: typeof UserNotificationsSettingsTable.$inferInsert
): Promise<void> {
    await db.insert(UserNotificationsSettingsTable).values(settings).onConflictDoNothing();

    revalidateUserNotificationsSettingsCache(settings.userId)
}
