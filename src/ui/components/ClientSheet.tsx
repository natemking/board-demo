'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sheet } from 'components/shadcn/sheet';
import type { ClientSheetProps } from 'types';

export function ClientSheet({ children }: ClientSheetProps): React.JSX.Element {
    const [isOpen, setIsOpen] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter()
    return (
        <Sheet
            modal
            onOpenChange={open => {
                if (open) return;
                setIsOpen(false);
                router.push(`/?${searchParams.toString()}`)
            }}
            open={isOpen}
        >
            {children}
        </Sheet>
    );
}
