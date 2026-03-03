import { getJobListing } from 'lib/actions/jobListing';
import type { JobListingDetailsProps } from 'types';

export async function JobListingDetails({
    params,
    searchParams,
}: JobListingDetailsProps): Promise<React.JSX.Element> {
    const { jobListingId } = await params;

    const jobLisiting = await getJobListing(jobListingId)

    return <div>Enter</div>;
}
