import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { JobListingForm } from 'components/job-listing/JobListingForm';
import { Card, CardContent } from 'components/shadcn/card';
import type { JobListingPageProps } from 'types';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { getJobListingByJobListingId } from 'lib/actions/jobListing';

export default function EditJobListingPage(props: JobListingPageProps): React.JSX.Element {
    return (
        <div className='mx-auto max-w-5xl p-4'>
            <h1 className='mb-2 text-2xl font-bold'>Edit Job Listing</h1>

            <Card>
                <CardContent>
                    <Suspense>
                        <SuspendedPage {...props} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}

async function SuspendedPage({ params }: JobListingPageProps): Promise<React.JSX.Element | null> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return null;

    const { jobListingId } = await params;

    const jobListing = await getJobListingByJobListingId(jobListingId, orgId);

    if (!jobListing) return notFound();

    return <JobListingForm jobListing={jobListing} />;
}
