import { db } from 'drizzle/db';
import { JobListingApplicationTable } from 'drizzle/schema';
import { revalidateJobListingApplicationCache } from 'lib/db/cache/jobListingApplications';

export async function insertJobListingApplication(
    application: typeof JobListingApplicationTable.$inferInsert
): Promise<void> {
    await db
        .insert(JobListingApplicationTable)
        .values(application)
        
    revalidateJobListingApplicationCache(application)
}
