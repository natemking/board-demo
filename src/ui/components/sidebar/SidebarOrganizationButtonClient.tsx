'use client';

import Link from 'next/link';
import { useClerk } from '@clerk/nextjs';
import {
    ArrowLeftRightIcon,
    Building2Icon,
    ChevronsUpDown,
    CreditCardIcon,
    LogOutIcon,
    UserRoundCogIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { SidebarMenuButton, useSidebar } from 'shadcn/sidebar';
import { SignOutButton } from 'services/clerk/components/AuthBtns';
import type { SidebarOrganizationButtonClientProps } from 'types';
import { employerPricingUrl, employerUserSettingsNotificationsUrl, organizationsSelectUrl } from 'lib/constants';

function OrganizationInfo({
    user: { email },
    organization: { imageUrl, name },
}: SidebarOrganizationButtonClientProps): React.JSX.Element {
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
                    src={imageUrl ?? undefined}
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

export function SidebarOrganizationButtonClient({
    user,
    organization,
}: SidebarOrganizationButtonClientProps): React.JSX.Element {
    const { isMobile, setOpenMobile } = useSidebar();
    const { openOrganizationProfile } = useClerk();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                    size='lg'
                >
                    <OrganizationInfo
                        organization={organization}
                        user={user}
                    />
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
                    <OrganizationInfo
                        organization={organization}
                        user={user}
                    />
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => {
                        openOrganizationProfile();
                        setOpenMobile(false);
                    }}
                >
                    <Building2Icon className='mr-1' /> Manage Organization
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={employerUserSettingsNotificationsUrl}>
                        <UserRoundCogIcon className='mr-1' /> User Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={employerPricingUrl}>
                        <CreditCardIcon className='mr-1' /> Change Plan
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href={organizationsSelectUrl}>
                        <ArrowLeftRightIcon className='mr-1' /> Switch Organizations
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
