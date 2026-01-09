import Link from 'next/link';
import { LogInIcon } from 'lucide-react';
import { AppSidebarClient } from 'components/AppSidebarClient';
import { SidebarUserBtn } from 'components/SidebarUserBtn';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from 'shadcn/sidebar';
import { SignedOut } from 'services/clerk/components/SignInStatus';

export default function HomePage(): React.JSX.Element {
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
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <SidebarUserBtn />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <main className='flex-1'>Lorem ipsum</main>
            </AppSidebarClient>
        </SidebarProvider>
    );
}
