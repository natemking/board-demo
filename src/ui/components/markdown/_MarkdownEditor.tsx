/* eslint-disable import/no-default-export -- allow file to be default so it can be dynamically imported*/
'use client';

import { MDXEditor, headingsPlugin } from '@mdxeditor/editor';
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode';
import type { InternalMarkDownEditorProps } from 'types';
import { cn } from 'lib/utils';

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
            className={cn('markdown', { 'dark-theme': isDarkMode }, className)}
            markdown={markdown}
            onChange={e => { console.log(e); }}
            plugins={[headingsPlugin()]}
            ref={editorRef}
        />
    );
}
