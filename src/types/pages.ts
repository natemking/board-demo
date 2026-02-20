export type OrganizationsSelectPageProps = {
    searchParams: Promise<{ redirect?: string }>;
};
export type JobListingPageProps = {
    params: Promise<{ jobListingId: string }>;
};
export type HomePageProps = {
    searchParams: Promise<Record<string, string | string[]>>
};