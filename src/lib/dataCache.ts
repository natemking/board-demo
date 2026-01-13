type CacheTag =
    | 'users'
    | 'organizations'
    | 'jobListings'
    | 'userNotificationsSettings'
    | 'userResumes'
    | 'jobListingApplications'
    | 'organizationUserSettings';

export function getGlobalTag(tag:CacheTag): `global:${CacheTag}` {
    return `global:${tag}` as const;
}

export function getIdTag(tag: CacheTag, id: string): `${string}:${CacheTag}` {
    return `${id}:${tag}` as const;
}
