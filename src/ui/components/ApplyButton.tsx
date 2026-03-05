import Link from 'next/link';
import { connection } from 'next/server';
import { differenceInDays } from 'date-fns';
import { Button } from 'components/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/shadcn/dialog';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/popover';
import { SignUpButton } from 'services/clerk/components/AuthBtns';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';
import { getJobListingApplication } from 'lib/actions/applications';
import { getUserResume } from 'lib/actions/userResume';
import { userSettingsResumeUrl } from 'lib/constants';
import type { ApplyButtonProps } from 'types';
import { NewJobListingApplicationForm } from 'components/application/NewJobListingApplicationForm';

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

    const application = await getJobListingApplication(jobListingId, userId);

    if (application) {
        const formatter = new Intl.RelativeTimeFormat(undefined, {
            style: 'short',
            numeric: 'always',
        });

        await connection();
        const diff = differenceInDays(application.createdAt, new Date());

        return (
            <div className='text-sm text-muted-foreground'>
                You applied for this job {diff === 0 ? 'today' : formatter.format(diff, 'days')}
            </div>
        );
    }

    // const userResume = await getUserResume(userId);

    // if (!userResume) {
    //     return (
    //         <Popover>
    //             <PopoverTrigger asChild>
    //                 <Button>Apply</Button>
    //             </PopoverTrigger>
    //             <PopoverContent className='flex flex-col gap-2'>
    //                 You need to upload a resume before applying for a job.
    //                 <Button asChild>
    //                     <Link href={userSettingsResumeUrl}>Upload Resume</Link>
    //                 </Button>
    //             </PopoverContent>
    //         </Popover>
    //     );
    // }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Apply</Button>
            </DialogTrigger>
            <DialogContent className='flex max-h-[calc(100%-2rem)] flex-col overflow-hidden md:max-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Application</DialogTitle>
                    <DialogDescription>
                        Applying for a job cannot be undone and is something you can only do once
                        per job listing.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex-1 overflow-y-auto'>
                    <NewJobListingApplicationForm jobListingId={jobListingId}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
