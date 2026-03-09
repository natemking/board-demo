import { db } from 'drizzle/db';
import { UserResumeTable } from 'drizzle/schema';
import { revalidateUserResumeCache } from 'lib/db/cache/userResume';

export async function upsertUserResume(
    userId: string,
    data: Omit<typeof UserResumeTable.$inferInsert, 'userId'>
): Promise<void> {
    await db
        .insert(UserResumeTable)
        .values({ userId, ...data })
        .onConflictDoUpdate({ target: UserResumeTable.userId, set: data });

    revalidateUserResumeCache(userId)
}
