import { StarIcon, StarOffIcon } from 'lucide-react';
import { ActionButton } from 'components/ActionButton';
import { AsyncIf } from 'components/AsyncIf';
import { hasReachedMaxFeaturedJobListings, toggleJobListingFeatured } from 'lib/actions';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import type { JobListingFeatureToggleButtonProps } from 'types';
import { UpgradePopover } from 'components/UpgradePopover';

export function isFeatureToggleButtonText(
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
