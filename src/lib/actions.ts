'use server';

import { redirect } from 'next/navigation';
import { cacheTag } from 'next/cache';
import type z from 'zod';
import { and, desc, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingTable } from 'drizzle/schema';
import { insertJobListing, updateJobListing as updateJobListingDb } from 'db/jobListings';
import { getJobListingsIdTag, getJobListingsOrganizationTag } from 'db/cache/jobListings';
import { employerJobListingsUrl } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { jobListingFormZSchema } from 'lib/zSchema';
import type { BasicError } from 'types';

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

export async function getJobListingById(
    jobListingId: string,
    orgId: string
): Promise<typeof JobListingTable.$inferSelect | undefined> {
    'use cache';

    cacheTag(getJobListingsIdTag(jobListingId));

    return db.query.JobListingTable.findFirst({
        where: and(eq(JobListingTable.id, jobListingId), eq(JobListingTable.organizationId, orgId)),
    });
}

export async function createJobListing(
    unsafeData: z.infer<typeof jobListingFormZSchema>
): Promise<BasicError> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) {
        return {
            error: true,
            message: 'You do not have permissions to create a job listing',
        };
    }

    const { success, data } = jobListingFormZSchema.safeParse(unsafeData);

    if (!success) {
        return {
            error: true,
            message: 'There was an error creating the job listing',
        };
    }

    const jobListing = await insertJobListing({
        ...data,
        organizationId: orgId,
        status: 'draft',
        isFeatured: false,
    });

    redirect(`${employerJobListingsUrl}/${jobListing.id}`);
}

export async function updateJobListing(
    id: string,
    unsafeData: z.infer<typeof jobListingFormZSchema>
): Promise<BasicError> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) {
        return {
            error: true,
            message: 'You do not have permissions to edit a job listing',
        };
    }

    const { success, data } = jobListingFormZSchema.safeParse(unsafeData);

    if (!success) {
        return {
            error: true,
            message: 'There was an error editing the job listing',
        };
    }

    const updatedJobListing = await updateJobListingDb(id,data);

    redirect(`${employerJobListingsUrl}/${updatedJobListing.id}`);
}
