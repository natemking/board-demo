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

export function getIdTag(tag: CacheTag, id: string): `id:${string}-${CacheTag}` {
    return `id:${id}-${tag}` as const;
}

export function getOrganizationTag(tag: CacheTag, orgId: string): `organization:${string}-${CacheTag}` {
    return `organization:${orgId}-${tag}` as const;
}
