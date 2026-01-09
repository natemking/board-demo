'use client';

import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import { ChevronsUpDown, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { SidebarMenuButton } from 'shadcn/sidebar';
import { useIsMobile } from 'lib/hooks/useMobile';
import { SignOutButton } from 'services/clerk/components/AuthBtns';
import type { SidebarUserButtonClientProps } from 'types';

function UserInfo({
    user: { email, imageUrl, name },
}: SidebarUserButtonClientProps): React.JSX.Element {
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
            <div className='flex min-w-0 flex-1 flex-col leading-tight group-data-[state=collapsed]:hidden'>
                <span className='truncate text-sm font-semibold'>{name}</span>
                <span className='truncate text-xs'>{email}</span>
            </div>
        </div>
    );
}

export function SidebarUserButtonClient({ user }: SidebarUserButtonClientProps): React.JSX.Element {
    const isMobile = useIsMobile();
    const { openUserProfile } = useClerk();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                    size='lg'
                >
                    <UserInfo user={user} />
                    <ChevronsUpDown className='ml-auto group-data-[state=collapsed]:hidden' />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align='end'
                className='max-w-80 min-w-64'
                side={isMobile ? 'bottom' : 'right'}
                sideOffset={4}
            >
                <DropdownMenuLabel className='p-1 font-normal'>
                    <UserInfo user={user} />
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => {
                        openUserProfile();
                    }}
                >
                    <UserIcon className='mr-1' /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/user-settings/notifications'>
                        <SettingsIcon className='mr-1' /> Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <SignOutButton>
                    <DropdownMenuItem>
                        <LogOutIcon className='mr-1' /> Logout
                    </DropdownMenuItem>
                </SignOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
