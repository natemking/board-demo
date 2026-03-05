'use server'

import { cacheTag } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { UserResumeTable } from 'drizzle/schema';
import { getUserResumeIdTag } from 'lib/db/cache/userResume';

export async function getUserResume(
    userId: string
): Promise<typeof UserResumeTable.$inferSelect | undefined> {
    'use cache'
    cacheTag(getUserResumeIdTag(userId))

    const resume = db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
    });

    return resume;
}

export async function getUserResumeUserId(
    userId: string
): Promise<Pick<typeof UserResumeTable.$inferSelect, 'userId'> | undefined> {
    'use cache'
    cacheTag(getUserResumeIdTag(userId))

    const resume = db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
        columns: { userId: true }
    });

    return resume;
}
