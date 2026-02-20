import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'components/shadcn/sidebar';
import { getJobListings } from 'lib/actions/jobListing';
import { employerJobListingsNewUrl } from 'lib/constants';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import type { JobListingMenuProps } from 'types';

export async function JobListingMenu({ orgId }: JobListingMenuProps): Promise<React.JSX.Element> {
    const jobListings = await getJobListings(orgId);

    if (jobListings.length === 0 && (await hasOrgUserPermissions('org:job_listings:create'))) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={employerJobListingsNewUrl}>
                            <PlusIcon />
                            <span>Create your first job listing</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    return <div>Enter</div>;
}
