import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import type {
    ExperienceLevel,
    JobListingStatus,
    JobListingType,
    LocationRequirement,
    WageInterval,
} from 'drizzle/schema';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function formatWageInterval(interval: WageInterval): 'Hour' | 'Year' {
    switch (interval) {
        case 'hourly':
            return 'Hour';
        case 'yearly':
            return 'Year';
        default:
            throw new Error(`Invalid wage interval: ${interval satisfies never}`);
    }
}

export function formatLocationRequirement(
    lr: LocationRequirement
): 'Hybrid' | 'In Office' | 'Remote' {
    switch (lr) {
        case 'hybrid':
            return 'Hybrid';
        case 'in-office':
            return 'In Office';
        case 'remote':
            return 'Remote';
        default:
            throw new Error(`Invalid location requirement: ${lr satisfies never}`);
    }
}

export function formatJobListingsType(
    type: JobListingType
): 'Full Time' | 'Internship' | 'Part Time' {
    switch (type) {
        case 'full-time':
            return 'Full Time';
        case 'internship':
            return 'Internship';
        case 'part-time':
            return 'Part Time';
        default:
            throw new Error(`Invalid job listing type: ${type satisfies never}`);
    }
}

export function formatExperienceLevel(level: ExperienceLevel): 'Junior' | 'Mid Level' | 'Senior' {
    switch (level) {
        case 'junior':
            return 'Junior';
        case 'mid-level':
            return 'Mid Level';
        case 'senior':
            return 'Senior';
        default:
            throw new Error(`Invalid experience level: ${level satisfies never}`);
    }
}

export function formatJobListingsStatus(
    status: JobListingStatus
): 'Delisted' | 'Draft' | 'Published' {
    switch (status) {
        case 'delisted':
            return 'Delisted';
        case 'draft':
            return 'Draft';
        case 'published':
            return 'Published';
        default:
            throw new Error(`Invalid job listing status: ${status satisfies never}`);
    }
}

export function formatWage(wage: number, wageInterval: WageInterval): string {
    const wageFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    switch (wageInterval) {
        case 'hourly':
            return `${wageFormatter.format(wage)} / hr`;
        case 'yearly':
            return wageFormatter.format(wage);
        default:
            throw new Error(`Invalid wage interval: ${wageInterval satisfies never}`);
    }
}

export function formatJobListingLocation({
    stateAbbreviation,
    city,
}: {
    stateAbbreviation: string | null;
    city: string | null;
}): string {
    if (!stateAbbreviation && !city) return 'None';

    const locationParts = [];
    if (city) locationParts.push(city);
    if (stateAbbreviation) locationParts.push(stateAbbreviation);

    return locationParts.join(', ');
}


export function getNextJobListingStatus(status: JobListingStatus): 'published' | 'delisted' {
    switch(status) {
        case 'draft':
        case 'delisted':
            return 'published'
        case 'published':
            return 'delisted'
        default: 
            throw new Error(`Unknown job listing status: ${status satisfies never}`)
    }
}