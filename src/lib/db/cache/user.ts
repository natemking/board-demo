import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag } from 'lib/dataCache';

export function getUserGlobalTag(): string {
    return getGlobalTag('users');
}

export function getUserIdTag(id: string): string {
    return getIdTag('users', id);
}

export function revalidateUserCache(id: string): void {
    revalidateTag(getUserGlobalTag(), { expire: 0 })
    revalidateTag(getUserIdTag(id), { expire: 0 })
}