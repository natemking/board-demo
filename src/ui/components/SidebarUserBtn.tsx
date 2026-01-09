import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { SidebarUserBtnClient } from 'components/SidebarUserBtnClient';

export function SidebarUserBtn(): React.JSX.Element {
    return (
        <Suspense>
            <SidebarUserSuspense />
        </Suspense>
    );
}

export async function SidebarUserSuspense(): Promise<React.JSX.Element> {
    const { userId } = await auth()
    return (
       <SidebarUserBtnClient user={{email: 'test@test.com', name: 'test test', imgUrl: ''}}/>
    );
}