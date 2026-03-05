'use server';

import type z from 'zod';
import { cacheTag } from 'next/cache';
import { and, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingApplicationTable } from 'drizzle/schema';
import { getJobListingApplicationIdTag } from 'db/cache/jobListingApplications';
import { inngest } from 'services/inngest/client';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';
import { getUserResumeUserId } from 'lib/actions/userResume';
import { getPublicJobListing } from 'lib/actions/jobListing';
import { insertJobListingApplication } from 'lib/db/jobListingApplications';
import { newJobListingApplicationSchema } from 'lib/zSchema';
import type { BasicError } from 'types';

export async function getJobListingApplication(
    jobListingId: string,
    userId: string
): Promise<typeof JobListingApplicationTable.$inferSelect | undefined> {
    'use cache';

    cacheTag(getJobListingApplicationIdTag({ jobListingId, userId }));

    return await db.query.JobListingApplicationTable.findFirst({
        where: and(
            eq(JobListingApplicationTable.jobListingId, jobListingId),
            eq(JobListingApplicationTable.userId, userId)
        ),
    });
}

export async function createJobListingApplication(
    jobListingId: string,
    unsafeData: z.infer<typeof newJobListingApplicationSchema>
): Promise<BasicError> {
    const permissionError: BasicError = {
        error: true,
        message: "You don't have permission to submit and application.",
    };

    const { userId } = await getCurrentUser();
    if (!userId) return permissionError;

    const [userResume, jobListing] = await Promise.all([
        getUserResumeUserId(userId),
        getPublicJobListing(jobListingId),
    ]);

    if (!userResume || !jobListing) return permissionError;

    const { success, data } = newJobListingApplicationSchema.safeParse(unsafeData);

    console.log(success);

    if (!success) {
        return {
            error: true,
            message: 'There was an error submitting your application.'
        }
    }

    await insertJobListingApplication({
        jobListingId,
        userId,
        ...data
    })
    
    // TODO: AI generation
    await inngest.send({
        name: 'app/jobListingApplication.created',
        data: { jobListingId, userId }
    })

    return {
        error: false,
        message: 'Your application was successfully submitted'
    }

}
