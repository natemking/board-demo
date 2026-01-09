import { useEffect, useState } from 'react';

export function useIsDarkMode(): boolean {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const controller = new AbortController();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
            'change',
            e => {
                setIsDarkMode(e.matches);
            },
            { signal: controller.signal }
        );

        return () => {controller.abort()}


        // const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // const handler = (e: MediaQueryListEvent): void => {
        //     setIsDarkMode(e.matches);
        // };

        // mediaQuery.addEventListener('change', handler);
        // return () => {
        //     mediaQuery.removeEventListener('change', handler);
        // };
    }, []);

    return isDarkMode;
}
