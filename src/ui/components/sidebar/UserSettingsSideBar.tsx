import { BellIcon, FileUserIcon } from 'lucide-react';
import { SidebarNavMenuGroup } from 'components/sidebar/SidebarNavMenuGroup';
import { userSettingsNotificationsUrl, userSettingsResumeUrl } from 'lib/constants';

export function UserSettingsSideBar(): React.JSX.Element {
    return (
        <SidebarNavMenuGroup
            items={[
                { 
                    href: userSettingsNotificationsUrl, 
                    icon: <BellIcon />, 
                    label: 'Notifications' 
                },
                { 
                    href: userSettingsResumeUrl, 
                    icon: <FileUserIcon />, 
                    label: 'Resume' 
                },
            ]}
        />
    );
}
