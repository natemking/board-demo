import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { UserTable } from 'drizzle/schema';

export async function getCurrentUser({ allData = false } = {}): Promise<{
    userId: string | null;
    user: Awaited<ReturnType<typeof getUser>> | undefined;
}> {
    const { userId } = await auth();

    return {
        userId,
        user: allData && userId !== null ?  await getUser(userId) : undefined,
    };
}

async function getUser(id: string): Promise<typeof UserTable.$inferSelect | undefined> {
    'use cache';
    
    return db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
    });
}
