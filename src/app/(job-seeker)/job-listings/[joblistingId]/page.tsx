import { Suspense } from 'react';
import { ClientSheet } from 'components/ClientSheet';
import { IsBreakpoint } from 'components/IsBreakpoint';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { JobListingDetails } from 'components/job-listing/JobListingDetails';
import { JobListingItems } from 'components/job-listing/JobListingItems';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/shadcn/resizable';
import { SheetContent, SheetHeader, SheetTitle } from 'components/shadcn/sheet';
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
            <ResizablePanel
                defaultSize='60%'
                id='left'
                minSize='30%'
            >
                <div className='h-screen overflow-y-auto p-4'>
                    <JobListingItems
                        params={params}
                        searchParams={searchParams}
                    />
                </div>
            </ResizablePanel>
            <IsBreakpoint
                breakpoint='min-width:1024px'
                otherwise={
                    <ClientSheet>
                        <SheetContent
                            className='p-4'
                            hideCloseButton
                        >
                            <SheetHeader className='sr-only'>
                                <SheetTitle>Job Listing Details</SheetTitle>
                            </SheetHeader>
                            <Suspense fallback={<LoadingSpinner />}>
                                <JobListingDetails
                                    params={params}
                                    searchParams={searchParams}
                                />
                            </Suspense>
                        </SheetContent>
                    </ClientSheet>
                }
            >
                <ResizableHandle
                    className='mx-2'
                    withHandle
                />
                <ResizablePanel
                    defaultSize='40%'
                    id='right'
                    minSize='30%'
                >
                    <div className='h-screen overflow-y-auto p-4'>
                        <Suspense fallback={<LoadingSpinner />}>
                            <JobListingDetails
                                params={params}
                                searchParams={searchParams}
                            />
                        </Suspense>
                    </div>
                </ResizablePanel>
            </IsBreakpoint>
        </ResizablePanelGroup>
    );
}
