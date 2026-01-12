import { Suspense } from 'react';
import { LogOutIcon } from 'lucide-react';
import { SidebarUserButtonClient } from 'components/SidebarUserButtonClient';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';
import { SignOutButton } from 'lib/services/clerk/components/AuthBtns';
import { SidebarMenuButton } from 'components/shadcn/sidebar';

export function SidebarUserButton(): React.JSX.Element {
    return (
        <Suspense>
            <SidebarUserSuspense />
        </Suspense>
    );
}

export async function SidebarUserSuspense(): Promise<React.JSX.Element> {
    const { user } = await getCurrentUser({allData: true})
    
    if (!user) {
        return(
            <SignOutButton>
                <SidebarMenuButton>
                    <LogOutIcon />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SignOutButton>
        )
    }

    return (
       <SidebarUserButtonClient user={user}/>
    );
}