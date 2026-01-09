'use client';

import { Suspense } from 'react';
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode';
import type { CompositionalComponent } from 'types';

export function ClerkProvider({ children }: CompositionalComponent): React.JSX.Element {
    const isDarkMode = useIsDarkMode();

    return (
       <Suspense>
            <OriginalClerkProvider appearance={isDarkMode ? { baseTheme: [dark] } : undefined}>
                {children}
            </OriginalClerkProvider>
       </Suspense>
    );
}
