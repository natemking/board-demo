'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { SidebarMenu, SidebarMenuButton } from 'shadcn/sidebar';
import { useIsMobile } from 'lib/hooks/useMobile';
import type { SidebarUserBtnClientProps } from 'types';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';

function UserInfo({
    user: { email, imageUrl, name },
}: SidebarUserBtnClientProps): React.JSX.Element {
    const nameInitials = name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('');

    return (
        <div className='flex items-center gap-2 overflow-hidden'>
            <Avatar className='size-8 rounded-lg'>
                <AvatarImage
                    alt={name}
                    src={imageUrl}
                />
                <AvatarFallback className='bg-primary text-primary-foreground uppercase'>
                    {nameInitials}
                </AvatarFallback>
            </Avatar>
            <div className='flex min-w-0 flex-1 flex-col leading-tight group-data-state-collapsed:hidden'>
                <span className='truncate text-sm font-semibold'>{name}</span>
                <span className='truncate text-xs'>{email}</span>
            </div>
        </div>
    );
}

export function SidebarUserBtnClient({ user }: SidebarUserBtnClientProps): React.JSX.Element {
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                        className='data-state-open:bg-sidebar-accent data-state-open:text-sidebar-accent-foreground'
                        size='lg'
                    >
                        <UserInfo user={user} />
                        <ChevronsUpDown className='ml-auto group-data-state-collapsed:hidden' />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent></DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenu>
    );
}
