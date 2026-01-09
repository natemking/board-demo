import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

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
       <SidebarUserClient user={{email: 'test@test.com', name: 'test test', imgUrl: ''}}/>
    );
}