'use client';

import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { generateUploadDropzone } from '@uploadthing/react';
import type { CustomFileRouter } from 'lib/services/upload-thing/router';
import { cn } from 'lib/utils';

export const UploadDropzoneComponent = generateUploadDropzone<CustomFileRouter>();

export function UploadDropzone({
    className,
    onClientUploadComplete,
    onUploadError,
    ...props
}: ComponentProps<typeof UploadDropzoneComponent>): React.JSX.Element {
    return (
        <UploadDropzoneComponent
            {...props}
            className={cn(
                'flex items-center justify-center rounded-lg border-2 border-dashed border-muted hover:cursor-pointer',
                className
            )}
            onClientUploadComplete={async res => {
                for (const { serverData } of res) {
                    toast.success(serverData.message);
                }
                await onClientUploadComplete?.(res);
            }}
            onUploadError={async error => {
                toast.error(error.message);
                await onUploadError?.(error);
            }}
        />
    );
}
