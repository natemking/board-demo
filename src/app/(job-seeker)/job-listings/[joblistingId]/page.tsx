import { IsBreakpoint } from 'components/IsBreakpoint';
import { JobListingItems } from 'components/job-listing/JobListingItems';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/shadcn/resizable';
import type { JobListingPageWithSearchParams } from 'types';

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
            <IsBreakpoint breakpoint='min-width:1024px'>
                <ResizableHandle className='mx-2' withHandle/>
                <ResizablePanel defaultSize={40} id='right' minSize={30}>
                    <div className='p-4 h-screen overflow-y-auto'>
                        
                    </div>
                </ResizablePanel>
           
            </IsBreakpoint>
        </ResizablePanelGroup>
    );
}
