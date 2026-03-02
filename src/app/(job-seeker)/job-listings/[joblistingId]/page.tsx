import { ResizablePanel, ResizablePanelGroup } from 'components/shadcn/resizable';
import type { JobListingPageWithSearchParams } from 'types';
import { JobListingItems } from 'components/job-listing/JobListingItems';

export default function JobListingPage({
    params,
    searchParams,
}: JobListingPageWithSearchParams): React.JSX.Element {
    // const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    //     id: 'job-board-panel',
    //     storage: localStorage,
    // });

    return (
        <ResizablePanelGroup
            // defaultLayout={defaultLayout}
            // onLayoutChange={onLayoutChanged}
            orientation='horizontal'
        >
            <ResizablePanel defaultSize={60} id='left' minSize={30}>
                <div className='p-4 h-screen overflow-y-auto'>
                    <JobListingItems params={params} searchParams={searchParams}/>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
