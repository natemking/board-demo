'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from 'components/shadcn/sidebar';
import type { SidebarNavGroupProps } from 'types';
import { SignedIn, SignedOut } from 'lib/services/clerk/components/SignInStatus';

export function SidebarNavMenuGroup({ className, items }: SidebarNavGroupProps): React.JSX.Element {
    const pathname = usePathname();
    return (
        <SidebarGroup className={className}>
            <SidebarMenu>
                {items.map(item => {
                    const { authStatus, href, icon, label } = item;
                    const menuItems = (
                        <SidebarMenuItem key={href}>
                            <SidebarMenuButton
                                asChild
                                isActive={href === pathname}
                            >
                                <Link href={href}>
                                    {icon}
                                    <span>{label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );

                    if (authStatus === 'signedOut') {
                        return <SignedOut key={href}>{menuItems}</SignedOut>;
                    }

                    if (authStatus === 'signedIn') {
                        return <SignedIn key={href}>{menuItems}</SignedIn>;
                    }

                    return menuItems;
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
