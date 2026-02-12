import Link from 'next/link';
import type { ReactNode } from 'react';
import { ClipboardList, PlusIcon } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
} from 'components/shadcn/sidebar';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';
import { SidebarOrganizationButton } from 'components/sidebar/SidebarOrganizationButton';

export default function EmployerLayout({ children }: { children: ReactNode }): React.JSX.Element {
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
                            }
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
