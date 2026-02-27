import { Suspense } from 'react';
import { connection } from 'next/server';
import { differenceInDays } from 'date-fns';
import type { DaySincePostingProps } from 'types';
import { Badge } from 'components/shadcn/badge';
import { cn } from 'lib/utils';

export function DaysSincePosting(props: DaySincePostingProps): React.JSX.Element {
    return (
        <Suspense fallback={props.postedAt.toLocaleDateString()}>
            <SuspendedDaysSincePosting {...props} />
        </Suspense>
    );
}

async function SuspendedDaysSincePosting({
    className,
    postedAt,
}: DaySincePostingProps): Promise<React.JSX.Element> {
    await connection();

    const now = new Date();
    const daysSincePosted = differenceInDays(now, postedAt);

    return (
        <div className={cn('text-sm font-medium text-primary', className)}>
            {daysSincePosted === 0 ? (
                <Badge>New</Badge>
            ) : (
                new Intl.RelativeTimeFormat(undefined, {
                    style: 'narrow',
                    numeric: 'always',
                }).format(-daysSincePosted, 'days')
            )}
        </div>
    );
}
