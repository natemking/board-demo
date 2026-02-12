
import type { ReactNode } from 'react';
import { BrainCircuitIcon, ClipboardList, LayoutDashboard, LogInIcon } from 'lucide-react';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarUserButton } from 'components/sidebar/SidebarUserButton';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';

export default function JobSeekerLayout({ children }: { children: ReactNode }): React.JSX.Element {
    return (
        <AppSidebar
            content={
                <SidebarNavMenuGroup className='mt-auto' items={[
                    {
                        href: '/',
                        icon: <ClipboardList />,
                        label: 'Job Board'

                    },
                    {
                        href: '/ai-search',
                        icon: <BrainCircuitIcon />,
                        label: 'AI Search'

                    },
                    {
                        href: '/employer',
                        icon: <LayoutDashboard />,
                        label: 'Employer Dashboard',
                        authStatus: 'signedIn'
                    },
                    {
                        href: '/sign-in',
                        icon: <LogInIcon />,
                        label: 'Sign In',
                        authStatus: 'signedOut'
                    },
                ]}/>
            }
            footerButton={<SidebarUserButton />}
        >
            {children}
        </AppSidebar>
    );
}
