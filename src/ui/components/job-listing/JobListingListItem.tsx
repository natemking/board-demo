import { Suspense } from 'react';
import { DaysSincePosting } from 'components/DaysSincePosting';
import { Avatar, AvatarFallback, AvatarImage } from 'components/shadcn/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from 'components/shadcn/card';
import { cn } from 'lib/utils';
import type { JobListingListItemProps } from 'types';

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
                        {postedAt ? (
                            <div className='text-sm font-medium text-primary @min-md:hidden'>
                                <Suspense fallback={postedAt.toLocaleDateString()}>
                                    <DaysSincePosting postedAt={postedAt} />
                                </Suspense>
                            </div>
                        ) : null}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
