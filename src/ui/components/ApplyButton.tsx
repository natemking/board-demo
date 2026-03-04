import { Button } from 'components/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/popover';
import { SignUpButton } from 'services/clerk/components/AuthBtns';
import { getCurrentUser } from 'lib/services/clerk/getCurrentAuth';
import type { ApplyButtonProps } from 'types';

export async function ApplyButton({ jobListingId }: ApplyButtonProps): Promise<React.JSX.Element> {
    const { userId } = await getCurrentUser();
    if (userId === null) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Apply</Button>
                </PopoverTrigger>
                    <PopoverContent className='flex flex-col gap-2'>
                        You need to create an account before applying for a job.
                        <SignUpButton />
                    </PopoverContent>
            </Popover>
        );
    }
    return <div>Enter</div>;
}
