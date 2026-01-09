'use client';

import type { AppSidebarClientProps } from 'types';
import { SidebarTrigger } from 'shadcn/sidebar';
import { useIsMobile } from 'lib/hooks/useMobile';

export function AppSidebarClient({ children }: AppSidebarClientProps): React.JSX.Element | null {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className='flex w-full flex-col'>
                <div className='flex items-center gap-1 border-b p-2'>
                    <SidebarTrigger />
                    <span className='text-xl'>NMK Jobs</span>
                </div>
                <div className='flex flex-1'>{children}</div>
            </div>
        );
    }

    return <>{children}</>;
}
