'use server';

import { redirect } from 'next/navigation';
import { cacheTag } from 'next/cache';
import type z from 'zod';
import { and, count, desc, eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { JobListingTable } from 'drizzle/schema';
import { insertJobListing, updateJobListing as updateJobListingDb } from 'db/jobListings';
import { getJobListingsIdTag, getJobListingsOrganizationTag } from 'db/cache/jobListings';
import { employerJobListingsUrl } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import { hasPlanFeature } from 'lib/services/clerk/planFeatures';
import { getNextJobListingStatus } from 'lib/utils';
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

export async function getPublishedJobListingsCount(orgId: string): Promise<number> {
    'use cache';
    cacheTag(getJobListingsOrganizationTag(orgId));

    const [res] = await db
        .select({ count: count() })
        .from(JobListingTable)
        .where(
            and(eq(JobListingTable.organizationId, orgId), eq(JobListingTable.status, 'published'))
        );

    return res.count;
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

    if (!orgId || !(await hasOrgUserPermissions('org:job_listings:create'))) {
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

    if (!orgId || !(await hasOrgUserPermissions('org:job_listings:update'))) {
        return {
            error: true,
            message: 'You do not have permissions to update a job listing',
        };
    }

    const { success, data } = jobListingFormZSchema.safeParse(unsafeData);

    if (!success) {
        return {
            error: true,
            message: 'There was an error updating the job listing',
        };
    }

    const jobListing = await getJobListingById(id, orgId);

    if (!jobListing) {
        return {
            error: true,
            message: 'This job listing does not exist. ',
        };
    }

    const updatedJobListing = await updateJobListingDb(id, data);

    redirect(`${employerJobListingsUrl}/${updatedJobListing.id}`);
}

export async function hasReachedMaxPublishedJobListings(): Promise<boolean> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return true;

    const ct = await getPublishedJobListingsCount(orgId);

    const canPost = await Promise.all([
        hasPlanFeature('post_1_job_listing').then(hasFeature => hasFeature && ct < 1),
        hasPlanFeature('post_3_job_listings').then(hasFeature => hasFeature && ct < 3),
        hasPlanFeature('post_15_jog_listings').then(hasFeature => hasFeature && ct < 15),
    ]);

    return !canPost.some(Boolean);
}

export async function toggleJobListingStatus(id: string): Promise<BasicError> {
    const { orgId } = await getCurrentOrganization();

    const error = {
        error: true,
        message: 'You do not have permissions to update this job listing status',
    };

    if (!orgId) return error;

    const jobListing = await getJobListingById(id, orgId);

    if (!jobListing) return error;

    const { status } = jobListing;

    const newStatus = getNextJobListingStatus(status);

    if (
        !(await hasOrgUserPermissions('org:job_listings:status_change')) ||
        (newStatus === 'published' && (await hasReachedMaxPublishedJobListings()))
    ) {
        return error;
    }

    await updateJobListingDb(id, {
        status: newStatus,
        isFeatured: newStatus === 'published' ? undefined : false,
        postedAt:
            newStatus === 'published' && jobListing.postedAt === null ? new Date() : undefined,
    });

    return {
        error: false
    }
}
