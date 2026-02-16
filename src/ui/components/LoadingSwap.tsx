import { Loader2Icon } from 'lucide-react';
import type { LoadingSwapProps } from 'types';
import { cn } from 'lib/utils';

export function LoadingSwap({
    children,
    className,
    isLoading,
}: LoadingSwapProps): React.JSX.Element {
    const gridItemClass = 'col-start-1 col-end-1 row-start-1 row-end-1';
    return (
        <div className='grid place-items-center'>
            <div className={cn(gridItemClass, isLoading ? 'invisible' : 'visible', className)}>
                {children}
            </div>
            <div className={cn(gridItemClass, isLoading ? 'visible' : 'invisible', className)}>
                <Loader2Icon className='animate-spin' />
            </div>
        </div>
    );
}
