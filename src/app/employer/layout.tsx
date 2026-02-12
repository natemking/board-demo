import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ClipboardList, PlusIcon } from 'lucide-react';
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel } from 'components/shadcn/sidebar';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';
import { SidebarOrganizationButton } from 'components/sidebar/SidebarOrganizationButton';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';

export default function EmployerLayout({ children }: { children: ReactNode }): React.JSX.Element {
    return (
        <Suspense>
            <LayoutSuspense>{children}</LayoutSuspense>
        </Suspense>
    );
}

async function LayoutSuspense({ children }: { children: ReactNode }): Promise<React.JSX.Element> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return redirect('/organizations/select');

    return (
        <AppSidebar
            content={
                <>
                    <SidebarGroup>
                        <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
                        <SidebarGroupAction
                            asChild
                            title='Add Listing'
                        >
                            <Link href='/employer/job-listings/new'>
                                <PlusIcon />
                                <span className='sr-only'>Add Job Listing</span>
                            </Link>
                        </SidebarGroupAction>
                    </SidebarGroup>
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
