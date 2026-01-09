import { Suspense } from 'react';
import { SignedIn as ClerkSignedIn, SignedOut as ClerkSignedOut } from '@clerk/nextjs';
import type { SignedInStatusProps, SignedOutStatusProps } from 'types';

export function SignedOut({ children }: SignedOutStatusProps): React.JSX.Element {
    return (
        <Suspense>
            <ClerkSignedOut>{children}</ClerkSignedOut>
        </Suspense>
    );
}

export function SignedIn({ children }: SignedInStatusProps): React.JSX.Element {
    return (
        <Suspense>
            <ClerkSignedIn>{children}</ClerkSignedIn>
        </Suspense>
    );
}
