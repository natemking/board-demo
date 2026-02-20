import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ClipboardList, PlusIcon } from 'lucide-react';
import { AsyncIf } from 'components/AsyncIf';
import { JobListingMenu } from 'components/job-listing/JobListingMenu';
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
} from 'components/shadcn/sidebar';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';
import { SidebarOrganizationButton } from 'components/sidebar/SidebarOrganizationButton';
import { employerJobListingsNewUrl, organizationsSelectUrl } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { hasOrgUserPermissions } from 'lib/services/clerk/orgUserPermissions';

export default function EmployerLayout({ children }: { children: ReactNode }): React.JSX.Element {
    return (
        <Suspense>
            <LayoutSuspense>{children}</LayoutSuspense>
        </Suspense>
    );
}

async function LayoutSuspense({ children }: { children: ReactNode }): Promise<React.JSX.Element> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return redirect(organizationsSelectUrl);

    return (
        <AppSidebar
            content={
                <>
                    <SidebarGroup>
                        <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
                        <AsyncIf condition={() => hasOrgUserPermissions('org:job_listings:create')}>
                            <SidebarGroupAction
                                asChild
                                title='Add Listing'
                            >
                                <Link href={employerJobListingsNewUrl}>
                                    <PlusIcon />
                                    <span className='sr-only'>Add Job Listing</span>
                                </Link>
                            </SidebarGroupAction>
                        </AsyncIf>
                    </SidebarGroup>
                    <SidebarGroupContent className='group-data-[state=collapsed]:hidden'>
                        <Suspense>
                            <JobListingMenu orgId={orgId} />
                        </Suspense>
                    </SidebarGroupContent>
                    <SidebarNavMenuGroup
                        className='mt-auto'
                        items={[
                            {
                                href: '/',
                                icon: <ClipboardList />,
                                label: 'Job Board',
                            },
                        ]}
                    />
                </>
            }
            footerButton={<SidebarOrganizationButton />}
        >
            {children}
        </AppSidebar>
    );
}
