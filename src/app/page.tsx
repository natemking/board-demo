import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from 'shadcn/sidebar';

export default function HomePage(): React.JSX.Element {
    return (
        <SidebarProvider className='overflow-y-hidden'>
            <Sidebar
                className='overflow-hidden'
                collapsible='icon'
            >
                <SidebarHeader className='flex-row'>
                    <SidebarTrigger />
                    <span className='text-xl text-nowrap'>NMK Jobs</span>
                </SidebarHeader>
                <SidebarContent>Lorem Ipsum</SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                Click
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main className='flex-1'>Lorem ipsum</main>
        </SidebarProvider>
    );
}
