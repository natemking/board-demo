import { JobListingForm } from 'components/JobListingForm';
import { Card, CardContent } from 'components/shadcn/card';

export default function NewJobListingPage(): React.JSX.Element {
    return (
        <div className='mx-auto max-w-5xl p-4'>
            <h1 className='mb-2 text-2xl font-bold'>New Job Listing</h1>
            <p className='mb-6 text-muted-foreground'>
                This does not post the listing yet. It just saves the draft.
            </p>

            <Card>
                <CardContent>
                   <JobListingForm />
                </CardContent>
            </Card>
        </div>
    );
}
