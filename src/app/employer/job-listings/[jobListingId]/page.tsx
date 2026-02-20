import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import {
    JobListingDeleteButton,
    JobListingEditButton,
    JobListingFeaturedToggleButton,
    JobListingStatusUpdateButton,
} from 'components/job-listing/JobListingButtons';
import { JobListingBadges } from 'components/job-listing/JobListingBadges';
import { MarkdownRenderer } from 'components/markdown/MarkdownRenderer';
import { MarkdownPartial } from 'components/markdown/MarkdownPartial';
import { Badge } from 'components/shadcn/badge';
import { getJobListingByJobListingId } from 'lib/actions/jobListing';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { formatJobListingsStatus } from 'lib/utils';
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

    const jobListing = await getJobListingByJobListingId(jobListingId, orgId);

    if (!jobListing) return notFound();

    const { id, description, isFeatured, status, title } = jobListing;

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
                    <JobListingEditButton jobListingId={id} />
                    <JobListingStatusUpdateButton
                        jobListingId={id}
                        status={status}
                    />
                    {status === 'published' ? (
                        <JobListingFeaturedToggleButton
                            isFeatured={isFeatured}
                            jobListingId={id}
                        />
                    ) : null}
                    <JobListingDeleteButton jobListingId={id} />
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
