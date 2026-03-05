import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag } from 'lib/dataCache';

export function getUserResumeGlobalTag(): string {
    return getGlobalTag('userResumes');
}

export function getUserResumeIdTag(userId: string): string {
    return getIdTag('userResumes', userId);
}

export function revalidateUserCache(userId: string): void {
    revalidateTag(getUserResumeGlobalTag(), { expire: 0 })
    revalidateTag(getUserResumeIdTag(userId), { expire: 0 })
}