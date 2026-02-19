'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from 'components/shadcn/alert-dialog';
import { Button } from 'components/shadcn/button';
import type { ActionButtonProps } from 'types';
import { LoadingSwap } from 'components/LoadingSwap';

export function ActionButton({
    action,
    areYouSureDescription = 'This action cannot be undone',
    requireAreYouSure = false,
    ...props
}: ActionButtonProps): React.JSX.Element {
    const [isLoading, startTransition] = useTransition();

    function performAction(): void {
        startTransition(async () => {
            const data = await action();
            if (data.error) {
                toast.error(data.message ?? 'Unknown Error');
            }
        });
    }

    if (requireAreYouSure) {
        return (
            <AlertDialog open={isLoading ? true : undefined}>
                <AlertDialogTrigger asChild>
                    <Button {...props} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>{areYouSureDescription}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isLoading}
                            onClick={performAction}
                        >
                            <LoadingSwap isLoading={isLoading}>Yes</LoadingSwap>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <Button
            {...props}
            disabled={isLoading}
            onClick={performAction}
        >
            <LoadingSwap
                className='inline-flex items-center gap-2'
                isLoading={isLoading}
            >
                {props.children}
            </LoadingSwap>
        </Button>
    );
}
