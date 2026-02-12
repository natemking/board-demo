import { LogOutIcon } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { SidebarMenuButton } from 'components/shadcn/sidebar';

export function SidebarSignOutButton(): React.JSX.Element {
    return (
        <SignOutButton>
            <SidebarMenuButton>
                <LogOutIcon />
                <span>Log Out</span>
            </SidebarMenuButton>
        </SignOutButton>
    );
}
