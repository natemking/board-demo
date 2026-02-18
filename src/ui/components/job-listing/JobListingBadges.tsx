import type { ComponentProps } from 'react';
import {
    BanknoteIcon,
    BuildingIcon,
    GraduationCapIcon,
    HourglassIcon,
    MapPinIcon,
} from 'lucide-react';
import { Badge } from 'components/shadcn/badge';
import {
    cn,
    formatExperienceLevel,
    formatJobListingLocation,
    formatJobListingsType,
    formatLocationRequirement,
    formatWage,
} from 'lib/utils';
import type { JobListingBadgesProps } from 'types';

export function JobListingBadges({
    className,
    jobListing: {
        city,
        experienceLevel,
        isFeatured,
        locationRequirement,
        stateAbbreviation,
        type,
        wage,
        wageInterval,
    },
}: JobListingBadgesProps): React.JSX.Element {
    const badgeProps = {
        className,
        variant: 'outline',
    } satisfies ComponentProps<typeof Badge>;

    return (
        <>
            {isFeatured ? (
                <Badge
                    {...badgeProps}
                    className={cn(className, 'border-featured bg-featured/50 text-featured-foreground')}
                >
                    Featured
                </Badge>
            ) : null}

            {wage && wageInterval ? (
                <Badge {...badgeProps}>
                    <BanknoteIcon />
                    {formatWage(wage, wageInterval)}
                </Badge>
            ) : null}

            {stateAbbreviation || city ? (
                <Badge {...badgeProps}>
                    <MapPinIcon className='size-10' />
                    {formatJobListingLocation({ stateAbbreviation, city })}
                </Badge>
            ) : null}

            <Badge {...badgeProps}>
                <BuildingIcon />
                {formatLocationRequirement(locationRequirement)}
            </Badge>

            <Badge {...badgeProps}>
                <HourglassIcon />
                {formatJobListingsType(type)}
            </Badge>

            <Badge {...badgeProps}>
                <GraduationCapIcon />
                {formatExperienceLevel(experienceLevel)}
            </Badge>
        </>
    );
}
