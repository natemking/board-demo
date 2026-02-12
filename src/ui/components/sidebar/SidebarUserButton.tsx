import { Suspense } from 'react';
import { SidebarUserButtonClient } from 'components/sidebar/SidebarUserButtonClient';
import { SidebarSignOutButton } from 'components/sidebar/SidebarSignOutButton';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';

export function SidebarUserButton(): React.JSX.Element {
    return (
        <Suspense>
            <SidebarUserSuspense />
        </Suspense>
    );
}

export async function SidebarUserSuspense(): Promise<React.JSX.Element> {
    const { user } = await getCurrentUser({ allData: true });

    if (!user) {
        return (
           <SidebarSignOutButton />
        );
    }

    return <SidebarUserButtonClient user={user} />;
}
