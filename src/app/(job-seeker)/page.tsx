import { JobListingItems } from 'components/job-listing/JobListingItems';
import type { HomePageProps } from 'types';

export default function HomePage({ searchParams }: HomePageProps): React.JSX.Element {
    return (
        <div className='m-4'>
            <JobListingItems searchParams={searchParams} />
        </div>
    );
}
