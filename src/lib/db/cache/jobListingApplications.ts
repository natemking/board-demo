import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag, getJobListingTag } from 'lib/dataCache';

export function getJobListingApplicationGlobalTag(): string {
    return getGlobalTag('jobListingApplications');
}

export function getJobListingApplicationJobListingTag(jobListingId: string): string {
    return getJobListingTag('jobListingApplications', jobListingId);
}

export function getJobListingApplicationIdTag({
    jobListingId,
    userId,
}: {
    jobListingId: string;
    userId: string;
}): string {
    return getIdTag('jobListingApplications', `${jobListingId}-${userId}`);
}

export function revalidateJobListingsCache(id: { userId: string; jobListingId: string }): void {
    revalidateTag(getJobListingApplicationGlobalTag(), { expire: 0 });
    revalidateTag(getJobListingApplicationJobListingTag(id.jobListingId), { expire: 0 });
    revalidateTag(getJobListingApplicationIdTag(id), { expire: 0 });
}
