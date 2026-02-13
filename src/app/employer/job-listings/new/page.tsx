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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic natus ipsam ullam. Rem enim ea eum vero qui laboriosam voluptas necessitatibus veritatis eveniet aliquam odio, minus fugit ullam assumenda accusamus.
                </CardContent>
            </Card>
        </div>
    );
}
