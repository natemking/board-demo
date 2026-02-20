'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SidebarMenuSubButton, SidebarMenuSubItem } from 'components/shadcn/sidebar';
import type { JobListingMenuGroupProps } from 'types';
import { employerJobListingsUrl } from 'lib/constants';

export function JobListingMenuItem({
    applicationCount,
    id,
    title,
}: JobListingMenuGroupProps['jobListings'][0]): React.JSX.Element {
    const { jobListingId } = useParams();

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton
                asChild
                isActive={jobListingId === id}
            >
                <Link href={`${employerJobListingsUrl}/${id}`}>
                    <span className='truncate'>{title}</span>
                </Link>
            </SidebarMenuSubButton>
            {applicationCount > 0 ? (
                <div className='absolute top-1/2 right-2 -translate-y-1/2 text-sm text-muted-foreground'>
                    {applicationCount}
                </div>
            ) : null}
        </SidebarMenuSubItem>
    );
}
