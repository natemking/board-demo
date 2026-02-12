import { SignedIn } from '@clerk/nextjs';
import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarTrigger,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter,
} from 'shadcn/sidebar';
import { AppSidebarClient } from 'components/sidebar/AppSidebarClient';
import type { AppSidebarProps } from 'types';

export function AppSidebar({ children, content, footerButton }: AppSidebarProps): React.JSX.Element {
    return (
        <SidebarProvider className='overflow-y-hidden'>
            <AppSidebarClient>
                <Sidebar
                    className='overflow-hidden'
                    collapsible='icon'
                >
                    <SidebarHeader className='flex-row'>
                        <SidebarTrigger />
                        <span className='text-xl text-nowrap'>NMK Jobs</span>
                    </SidebarHeader>
                    <SidebarContent>{content}</SidebarContent>
                    <SignedIn>
                        <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    {footerButton}
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </SignedIn>
                </Sidebar>
                <main className='flex-1'>{children}</main>
            </AppSidebarClient>
        </SidebarProvider>
    );
}
