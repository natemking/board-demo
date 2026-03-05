import Link from 'next/link';
import { connection } from 'next/server';
import { differenceInDays } from 'date-fns';
import { Button } from 'components/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/popover';
import { SignUpButton } from 'services/clerk/components/AuthBtns';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';
import { getJobListingApplication } from 'lib/actions/applications';
import { getUserResume } from 'lib/actions/userResume';
import { userSettingsResumeUrl } from 'lib/constants';
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

    const userResume = await getUserResume(userId);

    if (!userResume) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Apply</Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col gap-2'>
                    You need to upload a resume before applying for a job.
                    <Button asChild>
                        <Link href={userSettingsResumeUrl}>
                            Upload Resume
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover>
        );
    }

    return <div>Enter</div>;
}
