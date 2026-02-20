'use client';

import { SidebarMenu } from 'components/shadcn/sidebar';
import { useParams } from 'next/navigation';
import type { JobListingMenuGroupProps } from 'types';

export function JobListingMenuGroup({ jobListings, status }: JobListingMenuGroupProps): React.JSX.Element {
    const { jobListingId } = useParams();

    return (
        <SidebarMenu>
            
        </SidebarMenu>
    );
}