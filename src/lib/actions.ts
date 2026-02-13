import { cacheTag } from 'next/cache';
import { desc, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingTable } from 'drizzle/schema';
import { getJobListingsOrganizationTag } from 'lib/db/cache/jobListings';

export async function getMostRecentJobListingByOrgId(
    orgId: string
): Promise<Pick<typeof JobListingTable.$inferSelect, 'id'> | undefined> {
    'use cache';

    cacheTag(getJobListingsOrganizationTag(orgId));

    return db.query.JobListingTable.findFirst({
        where: eq(JobListingTable.organizationId, orgId),
        orderBy: desc(JobListingTable.createdAt),
        columns: { id: true },
    });
}
