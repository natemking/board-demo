import type { ReactNode } from 'react';
import { BrainCircuitIcon, ClipboardList, LayoutDashboard, LogInIcon } from 'lucide-react';
import { AppSidebar } from 'components/sidebar/AppSidebar';
import { SidebarUserButton } from 'components/sidebar/SidebarUserButton';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';
import { aiSearchUrl, employerUrl, signInUrl } from 'lib/constants';

export default function JobSeekerLayout({
    children,
    sidebar,
}: {
    children: ReactNode;
    sidebar: ReactNode;
}): React.JSX.Element {
    return (
        <AppSidebar
            content={
                <>
                    {sidebar}
                    <SidebarNavMenuGroup
                        className='mt-auto'
                        items={[
                            {
                                href: '/',
                                icon: <ClipboardList />,
                                label: 'Job Board',
                            },
                            {
                                href: aiSearchUrl,
                                icon: <BrainCircuitIcon />,
                                label: 'AI Search',
                            },
                            {
                                href: employerUrl,
                                icon: <LayoutDashboard />,
                                label: 'Employer Dashboard',
                                authStatus: 'signedIn',
                            },
                            {
                                href: signInUrl,
                                icon: <LogInIcon />,
                                label: 'Sign In',
                                authStatus: 'signedOut',
                            },
                        ]}
                    />
                </>
            }
            footerButton={<SidebarUserButton />}
        >
            {children}
        </AppSidebar>
    );
}
