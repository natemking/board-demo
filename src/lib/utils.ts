import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import type { WageInterval } from 'drizzle/schema';

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
