import { Suspense } from 'react';
import Link from 'next/link';
import { searchJobListings } from 'lib/actions/jobListing';
import { jobListingsUrl } from 'lib/constants';
import type { JobListingItemsProps } from 'types';

export function JobListingItems(props: JobListingItemsProps): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedComponent {...props} />
        </Suspense>
    );
}

async function SuspendedComponent({
    searchParams,
    params,
}: JobListingItemsProps): Promise<React.JSX.Element> {
    const jobListingId = params ? (await params).jobListingId : undefined;
    const search = await searchParams

    // TODO Zod validate
    const jobListings = await searchJobListings(search, jobListingId);

    if (jobListings.length === 0) {
        return <div className='p-4 text-muted-foreground'>No job listings found</div>;
    }

    return (
        <div className='space-y-4'>
            {jobListings.map(({ id, title }) => (
                <Link className='block' href={`${jobListingsUrl}/${id}`} key={id}>
                    {title}
                </Link>
            ))}
        </div>
    );
}
