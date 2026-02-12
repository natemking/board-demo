import { Link, LogInIcon } from 'lucide-react';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarTrigger,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from 'shadcn/sidebar';
import { AppSidebarClient } from 'components/sidebar/AppSidebarClient';
import { SidebarUserButton } from 'components/sidebar/SidebarUserButton';

export function AppSidebar(): React.JSX.Element {
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
                    <SidebarContent>
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
                    </SidebarContent>
                    <SignedIn>
                        <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarUserButton />
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </SignedIn>
                </Sidebar>
                <main className='flex-1'>Lorem ipsum</main>
            </AppSidebarClient>
        </SidebarProvider>
    );
}
