import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingTable } from 'drizzle/schema';
import { revalidateJobListingsCache } from 'db/cache/jobListings';

export async function insertJobListing(
    jobListing: typeof JobListingTable.$inferInsert
): Promise<{ id: string; orgId: string }> {
    const [newListing] = await db
        .insert(JobListingTable)
        .values(jobListing)
        .returning({ id: JobListingTable.id, orgId: JobListingTable.organizationId });

    revalidateJobListingsCache({ id: newListing.id, orgId: newListing.orgId });

    return newListing;
}

export async function updateJobListing(
    id: string,
    jobListing: Partial<typeof JobListingTable.$inferInsert>
): Promise<{ id: string; orgId: string }> {
    const [updateListing] = await db
        .update(JobListingTable)
        .set(jobListing)
        .where(eq(JobListingTable.id, id))
        .returning({ id: JobListingTable.id, orgId: JobListingTable.organizationId });

    revalidateJobListingsCache(updateListing);

    return updateListing;
}

export async function deleteJobListing(id: string): Promise<{ id: string; orgId: string }> {
    const [deletedJobListing] = await db
        .delete(JobListingTable)
        .where(eq(JobListingTable.id, id))
        .returning({ id: JobListingTable.id, orgId: JobListingTable.organizationId });

    revalidateJobListingsCache(deletedJobListing);

    return deletedJobListing;
}
