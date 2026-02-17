'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from 'components/shadcn/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/shadcn/dialog';
import type { MarkdownPartialProps } from 'types';

export function MarkdownPartial({
    dialogMarkdown,
    dialogTitle,
    mainMarkdown,
}: MarkdownPartialProps): React.JSX.Element {
    const [isOverflowing, setIsOverflowing] = useState(false);

    const markdownRef = useRef<HTMLDivElement>(null);

    const checkOverflow = (node: HTMLDivElement): void => {
        setIsOverflowing(node.scrollHeight > node.clientHeight);
    };

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener(
            'resize',
            () => {
                if (markdownRef.current === null) return;
                checkOverflow(markdownRef.current);
            },
            { signal: controller.signal }
        );

        return () => {
            controller.abort();
        };
    }, []);

    useLayoutEffect(() => {
        if (markdownRef.current === null) return;
        checkOverflow(markdownRef.current);
    }, []);

    return (
        <>
            <div
                className='relative max-h-75 overflow-hidden'
                ref={markdownRef}
            >
                {mainMarkdown}
                {isOverflowing ? (
                    <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-background to-transparent to-15%' />
                ) : null}
            </div>
            {isOverflowing ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className='-ml-3 underline'
                            variant='ghost'
                        >
                            Read More
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='flex max-h-[calc(100%-2rem)] flex-col overflow-hidden md:max-w-3xl lg:max-w-4xl'>
                        <DialogHeader>
                            <DialogTitle>{dialogTitle}</DialogTitle>
                            <div className='flex-1 overflow-y-auto'>{dialogMarkdown}</div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ) : null}
        </>
    );
}
