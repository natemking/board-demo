import { Suspense } from 'react';
import { SidebarOrganizationButtonClient } from 'components/sidebar/SidebarOrganizationButtonClient';
import { SidebarSignOutButton } from 'components/sidebar/SidebarSignOutButton';
import { getCurrentOrganization, getCurrentUser } from 'services/clerk/getCurrentAuth';
 
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
            <SidebarSignOutButton />
        );
    }

    return <SidebarOrganizationButtonClient organization={organization} user={user} />;
}
