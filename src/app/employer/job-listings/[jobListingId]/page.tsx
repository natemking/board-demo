import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Badge } from 'components/shadcn/badge';
import { getJobListingById } from 'lib/actions';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { formatJobListingsStatus, formatJobListingsType } from 'lib/utils';
import type { JobListingPageProps } from 'types';

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

    const { status, title, type } =
        jobListing;

    return (
        <div className='@container mx-auto max-w-6xl space-y-6 p-4'>
            <div className='flex items-center justify-between gap-4 @max-4xl:flex-col @max-4xl:items-start'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <Badge>{formatJobListingsStatus(status)}</Badge>
                        <Badge>{formatJobListingsType(type)}</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}
