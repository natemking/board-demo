import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { SidebarUserButtonClient } from 'components/SidebarUserButtonClient';

export function SidebarUserButton(): React.JSX.Element {
    return (
        <Suspense>
            <SidebarUserSuspense />
        </Suspense>
    );
}

export async function SidebarUserSuspense(): Promise<React.JSX.Element> {
    const { userId } = await auth()
    return (
       <SidebarUserButtonClient user={{email: 'test@test.com', name: 'test test', imgUrl: ''}}/>
    );
}