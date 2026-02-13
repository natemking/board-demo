import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag, getOrganizationTag } from 'lib/dataCache';

export function getJobListingsGlobalTag(): string {
    return getGlobalTag('jobListings');
}

export function getJobListingsOrganizationTag(orgId: string): string {
    return getOrganizationTag('jobListings', orgId);
}

export function getJobListingsIdTag(id: string): string {
    return getIdTag('jobListings', id);
}

export function revalidateJobListingsCache({ id, orgId }: { id: string; orgId: string }): void {
    revalidateTag(getJobListingsGlobalTag(), { expire: 0 });
    revalidateTag(getJobListingsOrganizationTag(orgId), { expire: 0 });
    revalidateTag(getJobListingsIdTag(id), { expire: 0 });
}
