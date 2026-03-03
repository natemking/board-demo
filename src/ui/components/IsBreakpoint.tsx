'use client';

import { useIsBreakpoint } from 'lib/hooks/useIsBreakPoint';
import type { IsBreakpointProps } from 'types';

export function IsBreakpoint({ breakpoint, children, otherwise }: IsBreakpointProps): React.JSX.Element {
    const isBreakpoint = useIsBreakpoint(breakpoint);

    return isBreakpoint ? <>{children}</> : <div>{otherwise}</div>;
}
