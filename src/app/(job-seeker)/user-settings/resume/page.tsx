import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { AiSummaryCard } from 'components/AiSummaryCard';
import { DropzoneClient } from 'components/Dropzone/DropzoneClient';
import { Card, CardContent, CardFooter } from 'components/shadcn/card';
import { getUserResume } from 'lib/actions/userResume';
import { getCurrentUser } from 'lib/services/clerk/getCurrentAuth';
import { Button } from 'components/shadcn/button';
import Link from 'next/link';

export default function UserResumePage(): React.JSX.Element {
    return (
        <div className='mx-auto max-w-3xl space-y-6 px-4 py-8'>
            <h1 className='text-2xl font-bold'>Upload Your Resume</h1>
            <Card>
                <CardContent>
                    <DropzoneClient />
                </CardContent>
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

async function ResumeDetails(): Promise<React.JSX.Element | null> {
    const { userId } = await getCurrentUser();
    if (!userId) return notFound();

    const userResume = await getUserResume(userId);
    if (!userResume) return null;

    return (
        <CardFooter>
            <Button asChild>
                <Link
                    href={userResume.resumeFileUrl}
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    View Resume
                </Link>
            </Button>
        </CardFooter>
    );
}
