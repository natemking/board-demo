import type { ReactNode } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { AsyncIf } from 'components/AsyncIf';
import { Button } from 'components/shadcn/button';
import { PopoverTrigger, PopoverContent, Popover } from 'components/shadcn/popover';
import { hasReachedMaxFeaturedJobListings } from 'lib/actions';
import { employerPricingUrl } from 'lib/constants';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import { getNextJobListingStatus } from 'lib/utils';
import type { JobListingStatus } from 'drizzle/schema';
import type { JobListingStatusUpdateButtonProps } from 'types';

export function statusToggleButtonText(status: JobListingStatus): React.JSX.Element {
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

function UpgradePopover({
    buttonText,
    popoverText,
}: {
    buttonText: ReactNode;
    popoverText: ReactNode;
}): React.JSX.Element {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>{buttonText}</Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-2'>
                {popoverText}
                <Button asChild>
                    <Link href={employerPricingUrl}>Upgrade</Link>
                </Button>
            </PopoverContent>
        </Popover>
    );
}

export function JobListingStatusUpdateButton({
    status,
}: JobListingStatusUpdateButtonProps): React.JSX.Element {
    const button = <Button variant='outline'>Toggle</Button>;

    return (
        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:status_change')}>
            {getNextJobListingStatus(status) === 'published' ? (
                <AsyncIf
                    condition={async () => {
                        const isMaxed = await hasReachedMaxFeaturedJobListings();
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
