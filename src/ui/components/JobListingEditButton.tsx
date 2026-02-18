import Link from 'next/link';
import { EditIcon } from 'lucide-react';
import { AsyncIf } from 'components/AsyncIf';
import { Button } from 'components/shadcn/button';
import { employerJobListingsEditUrl } from 'lib/constants';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import type { JobListingEditButtonProps } from 'types';

export function JobListingEditButton({jobListingId}: JobListingEditButtonProps): React.JSX.Element {
    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:update')}>
            <Button
                asChild
                variant='outline'
            >
                <Link href={employerJobListingsEditUrl.replace('[jobListingId]', jobListingId)}>
                    <EditIcon className='size-4' />
                    Edit
                </Link>
            </Button>
        </AsyncIf>
    );
}
