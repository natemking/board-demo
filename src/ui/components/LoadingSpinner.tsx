import { Loader2Icon } from 'lucide-react';
import { cn } from 'lib/utils';
import type { LoadingSpinnerProps } from 'types';

export function LoadingSpinner({ className, ...props}: LoadingSpinnerProps): React.JSX.Element {
    return (
        <div className='size-full flex items-center justify-center'>
            <Loader2Icon 
                className={cn('animate-spin size-16', className)}
                {...props}
            />
        </div>
    );
} 