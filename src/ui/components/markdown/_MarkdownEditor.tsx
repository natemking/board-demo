/* eslint-disable import/no-default-export -- allow file to be default so it can be dynamically imported*/
'use client';

import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    InsertTable,
    InsertThematicBreak,
    ListsToggle,
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode';
import type { InternalMarkDownEditorProps } from 'types';
import { cn } from 'lib/utils';

function ToolbarContents(): React.JSX.Element {
    return (
        <>
            <BlockTypeSelect />
            <BoldItalicUnderlineToggles />
            <ListsToggle />
            <InsertThematicBreak />
            <InsertTable />
        </>
    );
}

export default function InternalMarkDownEditor({
    className,
    markdown,
    editorRef,
    ...props
}: InternalMarkDownEditorProps): React.JSX.Element {
    const isDarkMode = useIsDarkMode();

    return (
        <MDXEditor
            {...props}
            className={cn('markdown-prose', { 'dark-theme': isDarkMode }, className)}
            markdown={markdown}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                toolbarPlugin({
                    toolbarContents: ToolbarContents,
                }),
            ]}
            ref={editorRef}
            suppressHtmlProcessing
        />
    );
}
