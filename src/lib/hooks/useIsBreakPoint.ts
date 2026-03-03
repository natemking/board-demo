'use client'

// import { useEffect, useState } from 'react';
import { useSyncExternalStore } from 'react';

// export function useIsBreakpoint(breakpoint: string): boolean {
//     const [isBreakpoint, setIsBreakpoint] = useState(
//        false
//     );

//     useEffect(() => {
//         const controller = new AbortController();

//         const media = window.matchMedia(`(${breakpoint})`);

//         media.addEventListener(
//             'change',
//             e => {
//                 setIsBreakpoint(e.matches);
//             },
//             { signal: controller.signal }
//         );
        
//         // eslint-disable-next-line react-hooks/set-state-in-effect -- new rule too strict
//         setIsBreakpoint(media.matches)

//         return () => {
//             controller.abort();
//         };
//     }, [breakpoint]);

//     return isBreakpoint;
// }
export function useIsBreakpoint(breakpoint: string): boolean {
    return useSyncExternalStore(
        (onChange) => {
            const media = window.matchMedia(`(${breakpoint})`);
            media.addEventListener('change', onChange);
            return () => { media.removeEventListener('change', onChange); };
        },
        () => window.matchMedia(`(${breakpoint})`).matches,
        () => false // server snapshot
    );
}