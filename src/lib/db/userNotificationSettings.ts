import { db } from 'drizzle/db';
import { UserNotificationsSettingsTable } from 'drizzle/schema';

export async function insertUserNotificationsSettings(
    settings: typeof UserNotificationsSettingsTable.$inferInsert
): Promise<void> {
    await db.insert(UserNotificationsSettingsTable).values(settings).onConflictDoNothing();
}
