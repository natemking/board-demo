import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { XIcon } from 'lucide-react';
import { ApplyButton } from 'components/ApplyButton';
import { JobListingBadges } from 'components/job-listing/JobListingBadges';
import { MarkdownRenderer } from 'components/markdown/MarkdownRenderer';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';
import { Button } from 'components/shadcn/button';
import { getJobListing } from 'lib/actions/jobListing';
import { convertSearchParamsToString } from 'lib/utils';
import type { JobListingDetailsProps } from 'types';

export async function JobListingDetails({
    params,
    searchParams,
}: JobListingDetailsProps): Promise<React.JSX.Element> {
    const { jobListingId } = await params;

    const jobListing = await getJobListing(jobListingId);

    if (!jobListing) return notFound();

    const { description, organization, postedAt, title } = jobListing;

    const orgNameInitials = organization.name
        .split('')
        .splice(0, 4)
        .map(word => word[0])
        .join(',');

    return (
        <div className='@container space-y-6'>
            <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                    <Avatar className='size-12 @max-sm:hidden'>
                        <AvatarImage
                            alt={organization.name}
                            src={organization.imageUrl ?? undefined}
                        />
                        <AvatarFallback className='bg-primary text-primary uppercase'>
                            {orgNameInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
                        <div className='text-base text-muted-foreground'>{organization.name}</div>
                        {postedAt ? (
                            <div className='text-sm text-muted-foreground @min-lg:hidden'>
                                {postedAt.toLocaleDateString()}
                            </div>
                        ) : null}
                    </div>
                    <div className='ml-auto flex items-center gap-4'>
                        {postedAt ? (
                            <div className='text-sm text-muted-foreground @max-lg:hidden'>
                                {postedAt.toLocaleDateString()}
                            </div>
                        ) : null}
                        <Button
                            asChild
                            size='icon'
                            variant='outline'
                        >
                            <Link href={`/?${convertSearchParamsToString(await searchParams)}`}>
                                <span className='sr-only'>Close</span>
                                <XIcon />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className='mt-2 flex flex-wrap gap-2'>
                    <JobListingBadges jobListing={jobListing} />
                </div>
                <Suspense fallback={<Button disabled>Apply</Button>}>
                    <ApplyButton jobListingId={jobListingId} />
                </Suspense>
            </div>
            <MarkdownRenderer source={description} />
        </div>
    );
}
