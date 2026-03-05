import { cacheTag } from 'next/cache';
import { and, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingApplicationTable } from 'drizzle/schema';
import { getJobListingApplicationIdTag } from 'lib/db/cache/jobListingApplications';

export async function getJobListingApplication(jobListingId:string, userId: string): Promise<typeof JobListingApplicationTable.$inferSelect | undefined>{
    'use cache'

    cacheTag(getJobListingApplicationIdTag({jobListingId, userId}))

    return await db.query.JobListingApplicationTable.findFirst({
        where: and(
            eq(JobListingApplicationTable.jobListingId, jobListingId),
            eq(JobListingApplicationTable.userId, userId)
        )
    })

}