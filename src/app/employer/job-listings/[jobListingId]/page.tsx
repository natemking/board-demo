import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditIcon } from 'lucide-react';
import { AsyncIf } from 'components/AsyncIf';
import { JobListingBadges } from 'components/JobListingBadges';
import { MarkdownRenderer } from 'components/markdown/MarkdownRenderer';
import { MarkdownPartial } from 'components/markdown/MarkdownPartial';
import { Badge } from 'components/shadcn/badge';
import { Button } from 'components/shadcn/button';
import { getJobListingById, hasReachedMaxFeaturedJobListings } from 'lib/actions';
import { employerJobListingsEditUrl } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import {
    formatJobListingsStatus,
    getNextJobListingStatus,
} from 'lib/utils';
import type { JobListingPageProps } from 'types';
import type { JobListingStatus } from 'drizzle/schema';

export default function JobListingPage(props: JobListingPageProps): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

async function SuspendedPage({ params }: JobListingPageProps): Promise<React.JSX.Element | null> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return null;

    const { jobListingId } = await params;

    const jobListing = await getJobListingById(jobListingId, orgId);

    if (!jobListing) return notFound();

    const { id, description, status, title } = jobListing;

    return (
        <div className='@container mx-auto max-w-6xl space-y-6 p-4'>
            <div className='flex items-center justify-between gap-4 @max-4xl:flex-col @max-4xl:items-start'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
                    <div className='mt-2 flex flex-wrap gap-2'>
                        <Badge>{formatJobListingsStatus(status)}</Badge>
                        <JobListingBadges jobListing={jobListing} />
                    </div>
                </div>
                <div className='flex items-center gap-2 empty:-mt-4'>
                    <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:update')}>
                        <Button
                            asChild
                            variant='outline'
                        >
                            <Link href={employerJobListingsEditUrl.replace('[jobListingId]', id)}>
                                <EditIcon className='size-4' />
                                Edit
                            </Link>
                        </Button>
                    </AsyncIf>
                    <StatusUpdateButton status={status} />
                </div>
            </div>

            <MarkdownPartial
                dialogMarkdown={<MarkdownRenderer source={description} />}
                dialogTitle='Description'
                mainMarkdown={
                    <MarkdownRenderer
                        className='prose-sm'
                        source={description}
                    />
                }
            />
        </div>
    );
}

function StatusUpdateButton({ status }: { status: JobListingStatus }): React.JSX.Element {
    const button = <Button variant='outline'>Toggle</Button>;

    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:status_change')}>
            {getNextJobListingStatus(status) === 'published' ? (
                <AsyncIf
                    condition={async () => {
                        const isMaxed = await hasReachedMaxFeaturedJobListings();
                        return !isMaxed;
                    }}
                >
                    {button}
                </AsyncIf>
            ) : (
                button
            )}
        </AsyncIf>
    );
}
