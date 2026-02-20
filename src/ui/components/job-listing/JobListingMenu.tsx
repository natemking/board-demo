import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { JobListingMenuGroup } from 'components/job-listing/JobListingMenuGroup';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from 'components/shadcn/sidebar';
import { getJobListings } from 'lib/actions/jobListing';
import { employerJobListingsNewUrl } from 'lib/constants';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';
import { sortJobListingsByStatus } from 'lib/utils';
import type { JobListingStatus } from 'drizzle/schema';
import type { JobListingMenuProps } from 'types';

export async function JobListingMenu({ orgId }: JobListingMenuProps): Promise<React.JSX.Element> {
    const allJobListings = await getJobListings(orgId);

    if (allJobListings.length === 0 && (await hasOrgUserPermissions('org:job_listings:create'))) {
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

    return (
        <>
            {Object.entries(Object.groupBy(allJobListings, jL => jL.status))
                .sort(([a], [b]) =>
                    sortJobListingsByStatus(a as JobListingStatus, b as JobListingStatus)
                )
                .map(([status, jobListings]) => (
                    <JobListingMenuGroup
                        jobListings={jobListings}
                        key={status}
                        status={status as JobListingStatus}
                    />
                ))}
        </>
    );
}
