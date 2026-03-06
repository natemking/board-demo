import { Suspense } from 'react';
import { ResumeDetails } from 'components/ResumeDetails';
import { AiSummaryCard } from 'components/AiSummaryCard';
import { Card, CardContent } from 'components/shadcn/card';
import { UploadDropzone } from 'components/UploadThing';

export default function UserResumePage(): React.JSX.Element {
    return (
        <div className='mx-auto max-w-3xl space-y-6 px-4 py-8'>
            <h1 className='text-2xl font-bold'>Upload Your Resume</h1>
            <Card>
                <CardContent><UploadDropzone endpoint='resumeUploader' /></CardContent>
                <Suspense>
                    <ResumeDetails />
                </Suspense>
            </Card>
            <Suspense>
                <AiSummaryCard />
            </Suspense>
        </div>
    );
}
