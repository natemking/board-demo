import { Suspense } from 'react';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import type { JobListingPageProps } from 'types';
import { getJobListingById } from 'lib/actions';

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

    return <pre>{JSON.stringify(jobListing, null, 2)}</pre>;
}
