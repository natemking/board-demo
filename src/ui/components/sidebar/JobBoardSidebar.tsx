import { JobListingFilterForm } from 'components/job-listing/JobListingFilterForm';
import { SidebarGroup, SidebarGroupContent } from 'components/shadcn/sidebar';

export function JobBoardSidebar(): React.JSX.Element {
    return (
        <SidebarGroup className='group-data-[state=collapsed]:hidden'>
            <SidebarGroupContent className='px-1'>
                <JobListingFilterForm />
            </SidebarGroupContent>
        </SidebarGroup>
    );
}