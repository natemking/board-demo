'use client';

import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'components/shadcn/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from 'components/shadcn/sidebar';
import { formatJobListingsStatus } from 'lib/utils';
import type { JobListingMenuGroupProps } from 'types';

export function JobListingMenuGroup({
    jobListings,
    status,
}: JobListingMenuGroupProps): React.JSX.Element {
    const { jobListingId } = useParams();

    return (
        <SidebarMenu>
            <Collapsible
                className='group/collapsible'
                defaultOpen={
                    status !== 'delisted' || jobListings.some(job => job.id === jobListingId)
                }
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            {formatJobListingsStatus(status)}
                            <ChevronRight className='ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            Hi
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
}
