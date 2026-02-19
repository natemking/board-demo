import Link from 'next/link';
import { EditIcon, EyeIcon, EyeOffIcon, StarIcon, StarOffIcon, Trash2Icon } from 'lucide-react';
import { ActionButton } from 'components/ActionButton';
import { AsyncIf } from 'components/AsyncIf';
import { UpgradePopover } from 'components/UpgradePopover';
import { Button } from 'components/shadcn/button';
import {
    deleteJobListing,
    hasReachedMaxFeaturedJobListings,
    hasReachedMaxPublishedJobListings,
    toggleJobListingFeatured,
    toggleJobListingStatus,
} from 'lib/actions/jobListing';
import { employerJobListingsEditUrl } from 'lib/constants';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import type {
    JobListingBaseButtonProps,
    JobListingFeatureToggleButtonProps,
    JobListingStatusUpdateButtonProps,
} from 'types';
import { getNextJobListingStatus } from 'lib/utils';

export function JobListingDeleteButton({
    jobListingId,
}: JobListingBaseButtonProps): React.JSX.Element {
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

export function JobListingEditButton({
    jobListingId,
}: JobListingBaseButtonProps): React.JSX.Element {
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

export function JobListingFeaturedToggleButton({
    isFeatured,
    jobListingId,
}: JobListingFeatureToggleButtonProps): React.JSX.Element {
    const button = (
        <ActionButton
            action={toggleJobListingFeatured.bind(null, jobListingId)}
            variant='outline'
        >
            {isFeatureToggleButtonText(isFeatured)}
        </ActionButton>
    );

    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:status_change')}>
            {isFeatured ? (
                button
            ) : (
                <AsyncIf
                    condition={async () => {
                        const isMaxed = await hasReachedMaxFeaturedJobListings();
                        return !isMaxed;
                    }}
                    otherwise={
                        <UpgradePopover
                            buttonText={isFeatureToggleButtonText(isFeatured)}
                            popoverText='You must upgrade your plan to feature more job listings.'
                        />
                    }
                >
                    {button}
                </AsyncIf>
            )}
        </AsyncIf>
    );
}

export function JobListingStatusUpdateButton({
    jobListingId,
    status,
}: JobListingStatusUpdateButtonProps): React.JSX.Element {
    const button = (
        <ActionButton
            action={toggleJobListingStatus.bind(null, jobListingId)}
            areYouSureDescription='This will immediately show job listing to all users.'
            requireAreYouSure={getNextJobListingStatus(status) === 'published'}
            variant='outline'
        >
            {statusToggleButtonText(status)}
        </ActionButton>
    );

    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:status_change')}>
            {getNextJobListingStatus(status) === 'published' ? (
                <AsyncIf
                    condition={async () => {
                        const isMaxed = await hasReachedMaxPublishedJobListings();
                        return !isMaxed;
                    }}
                    otherwise={
                        <UpgradePopover
                            buttonText={statusToggleButtonText(status)}
                            popoverText='You must upgrade your plan to publish more job listings.'
                        />
                    }
                >
                    {button}
                </AsyncIf>
            ) : (
                button
            )}
        </AsyncIf>
    );
}

function statusToggleButtonText(
    status: JobListingStatusUpdateButtonProps['status']
): React.JSX.Element {
    switch (status) {
        case 'draft':
        case 'delisted':
            return (
                <>
                    <EyeIcon />
                    Publish
                </>
            );
        case 'published':
            return (
                <>
                    <EyeOffIcon />
                    Delist
                </>
            );
        default:
            throw new Error(`Unknown status ${status satisfies never}`);
    }
}

function isFeatureToggleButtonText(
    isFeatured: JobListingFeatureToggleButtonProps['isFeatured']
): React.JSX.Element {
    if (isFeatured) {
        return (
            <>
                <StarOffIcon className='size-4' />
                Unfeature
            </>
        );
    }

    return (
        <>
            <StarIcon className='size-4' />
            Feature
        </>
    );
}
