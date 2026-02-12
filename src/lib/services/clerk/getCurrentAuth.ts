import { cacheTag } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { OrganizationTable, UserTable } from 'drizzle/schema';
import { getUserIdTag } from 'db/cache/user';
import { getOrganizationIdTag } from 'db/cache/organizations';

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

export async function getCurrentOrganization({ allData = false } = {}): Promise<{
    orgId: string | null | undefined;
    organization: Awaited<ReturnType<typeof getOrganization>> | undefined;
}> {
    const { orgId  } = await auth();

    return {
        orgId,
        organization: allData && orgId ?  await getOrganization(orgId) : undefined,
    };
}

async function getUser(id: string): Promise<typeof UserTable.$inferSelect | undefined> {
    'use cache';
    
    cacheTag(getUserIdTag(id));

    return db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
    });
}

async function getOrganization(id: string): Promise<typeof OrganizationTable.$inferSelect | undefined> {
    'use cache';
    
    cacheTag(getOrganizationIdTag(id));

    return db.query.OrganizationTable.findFirst({
        where: eq(OrganizationTable.id, id),
    });
}
