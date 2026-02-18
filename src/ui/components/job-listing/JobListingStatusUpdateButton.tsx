
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

export function JobListingStatusUpdateButton({ status }: JobListingStatusUpdateButtonProps): React.JSX.Element {
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button>{statusToggleButtonText(status)}</Button>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col gap-2'>
                                You must upgrade your plan to publish more job listings.
                                <Button asChild>
                                    <Link href={employerPricingUrl}>
                                        Upgrade
                                    </Link>
                                </Button>
                            </PopoverContent>
                        </Popover>
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


