import { Suspense } from 'react';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import type { JobListingPageProps } from 'types';

export default function JobListingPage(props: JobListingPageProps): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedPage {...props}/>
        </Suspense>
    );
}

async function SuspendedPage({params}: JobListingPageProps): Promise<React.JSX.Element | null> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return null;

    const { jobListingId } = await params;

    return (
        <h1>{jobListingId}</h1>
    )
}
