'use client';

import { ChevronsUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'components/shadcn/dropdown-menu';
import { SidebarMenu, SidebarMenuButton,  } from 'shadcn/sidebar';
import { useIsMobile } from 'lib/hooks/useMobile';
import type { SidebarUserBtnClientProps } from 'types';

function UserInfo({ user }: SidebarUserBtnClientProps): React.JSX.Element {
 return null
}

export function SidebarUserBtnClient({ user }:SidebarUserBtnClientProps): React.JSX.Element {
    const isMobile = useIsMobile()

    return (
        <SidebarMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className='data-state-open:bg-sidebar-accent data-state-open:text-sidebar-accent-foreground' size='lg'>
                        <UserInfo user={user} />
                        <ChevronsUpDown className='ml-auto group-data-state-collapsed:hidden'/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenu>
    );
}
