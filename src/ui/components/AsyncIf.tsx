import { Suspense } from 'react';
import type { AsyncIfProps } from 'types';

export function AsyncIf({ loadingFallback, ...props }: AsyncIfProps): React.JSX.Element {
    return (
        <Suspense fallback={loadingFallback}>
            <SuspendedComponent {...props} />
        </Suspense>
    );
}

async function SuspendedComponent({
    children,
    condition,
    otherwise,
}: Omit<AsyncIfProps, 'loadingFallback'>): Promise<React.JSX.Element> {
    return (await condition()) ? <>{children}</> : <>{otherwise}</>;
}
