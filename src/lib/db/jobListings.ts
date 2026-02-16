import { db } from 'drizzle/db';
import { JobListingTable } from 'drizzle/schema';
import { revalidateJobListingsCache } from 'db/cache/jobListings';

export async function insertJobListing(
    jobListing: typeof JobListingTable.$inferInsert,
): Promise<{id: string, orgId: string}> {
    const [newListing] = await db
        .insert(JobListingTable)
        .values(jobListing)
        .returning({ id: JobListingTable.id, orgId: JobListingTable.organizationId });

    revalidateJobListingsCache({ id: newListing.id, orgId: newListing.orgId });

    return newListing;
}
