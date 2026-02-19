import { Trash2Icon } from 'lucide-react';
import { AsyncIf } from 'components/AsyncIf';
import { ActionButton } from 'components/ActionButton';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import { deleteJobListing } from 'lib/actions';
import type { JobListingDeleteButtonProps } from 'types';

export function JobListingDeleteButton({ jobListingId }: JobListingDeleteButtonProps): React.JSX.Element {
    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:delete')}>
            <ActionButton
                action={deleteJobListing.bind(null, jobListingId)}
                areYouSureDescription='Are your sure you want to delete this job?'
                requireAreYouSure
            >
                <Trash2Icon className='size-4' />
                Delete
            </ActionButton>
        </AsyncIf>
    );
}
