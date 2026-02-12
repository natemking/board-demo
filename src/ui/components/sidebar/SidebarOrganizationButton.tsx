import { Suspense } from 'react';
import { LogOutIcon } from 'lucide-react';
import { SidebarMenuButton } from 'components/shadcn/sidebar';
import { SidebarOrganizationButtonClient } from 'components/sidebar/SidebarOrganizationButtonClient';
import { getCurrentOrganization, getCurrentUser } from 'services/clerk/getCurrentAuth';
import { SignOutButton } from 'lib/services/clerk/components/AuthBtns';
 
export function SidebarOrganizationButton(): React.JSX.Element {
    return (
        <Suspense>
            <SidebarOrganizationSuspense />
        </Suspense>
    );
}

export async function SidebarOrganizationSuspense(): Promise<React.JSX.Element> {
    const [{ user }, { organization }] = await Promise.all([
        getCurrentUser({ allData: true }),
        getCurrentOrganization({ allData: true }),
    ]);
    

    if (!user || !organization) {
        return (
            <SignOutButton>
                <SidebarMenuButton>
                    <LogOutIcon />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SignOutButton>
        );
    }

    return <SidebarOrganizationButtonClient organization={organization} user={user} />;
}
