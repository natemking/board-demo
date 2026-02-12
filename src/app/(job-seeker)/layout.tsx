import Link from 'next/link';
import type { ReactNode } from 'react';
import { LogInIcon } from 'lucide-react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from 'components/shadcn/sidebar';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarUserButton } from 'components/sidebar/SidebarUserButton';
import { SignedOut } from 'lib/services/clerk/components/SignInStatus';

export default function JobSeekerLayout({ children }: { children: ReactNode }): React.JSX.Element {
    return (
        <AppSidebar
            content={
                <SidebarGroup>
                    <SidebarMenu>
                        <SignedOut>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/sign-in'>
                                        <LogInIcon />
                                        <span>Log In</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SignedOut>
                    </SidebarMenu>
                </SidebarGroup>
            }
            footerButton={<SidebarUserButton />}
        >
            {children}
        </AppSidebar>
    );
}
