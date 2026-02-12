import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag } from 'lib/dataCache';

export function getOrganizationsGlobalTag(): string {
    return getGlobalTag('organizations');
}

export function getOrganizationIdTag(id: string): string {
    return getIdTag('organizations', id);
}

export function revalidateOrganizationsCache(id: string): void {
    revalidateTag(getOrganizationsGlobalTag(), { expire: 0 })
    revalidateTag(getOrganizationIdTag(id), { expire: 0 })
}