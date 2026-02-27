import { Suspense } from 'react';
import { DaysSincePosting } from 'components/DaysSincePosting';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/shadcn/card';
import { cn } from 'lib/utils';
import type { JobListingListItemProps } from 'types';
import { JobListingBadges } from 'components/job-listing/JobListingBadges';

export function JobListingListItem({
    jobListing,
    organization,
}: JobListingListItemProps): React.JSX.Element {
    const {
        city,
        experienceLevel,
        isFeatured,
        locationRequirement,
        postedAt,
        stateAbbreviation,
        title,
        type,
        wage,
        wageInterval,
    } = jobListing;
    const { name, imageUrl } = organization;

    const orgNameInitials = name
        .split(' ')
        .splice(0, 4)
        .map(word => word[0])
        .join(',');

    return (
        <Card className={cn('@container', { 'border-featured bg-featured/20': isFeatured })}>
            <CardHeader>
                <div className='flex gap-4'>
                    <Avatar className='size-12 @max-sm:hidden'>
                        <AvatarImage
                            alt={name}
                            src={imageUrl ?? undefined}
                        />
                        <AvatarFallback className='bg-primary text-primary uppercase'>
                            {orgNameInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <CardTitle className='text-xl'>{title}</CardTitle>
                        <CardDescription className='text-base'>{name}</CardDescription>
                        {/* mobile */}
                        {postedAt ? (
                            <DaysSincePosting
                                className='@min-md:hidden'
                                postedAt={postedAt}
                            />
                        ) : null}
                    </div>
                    {/* desktop */}
                    {postedAt ? (
                        <DaysSincePosting
                            className='ml-auto @max-md:hidden'
                            postedAt={postedAt}
                        />
                    ) : null}
                </div>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
                <JobListingBadges
                    className={isFeatured ? 'border-primary/35' : undefined}
                    jobListing={jobListing}
                />
            </CardContent>
        </Card>
    );
}
