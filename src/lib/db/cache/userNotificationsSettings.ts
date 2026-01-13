import { revalidateTag } from 'next/cache';
import { getGlobalTag, getIdTag } from 'lib/dataCache';

export function getUserNotificationsSettingGlobalTag(): string {
    return getGlobalTag('userNotificationsSettings');
}

export function getUserNotificationsSettingIdTag(userId: string): string {
    return getIdTag('userNotificationsSettings', userId);
}

export function revalidateUserNotificationsSettingsCache(userId: string): void {
    revalidateTag(getUserNotificationsSettingGlobalTag(), { expire: 0 })
    revalidateTag(getUserNotificationsSettingIdTag(userId), { expire: 0 })
}