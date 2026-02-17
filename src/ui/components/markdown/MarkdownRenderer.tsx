import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { cn } from 'lib/utils';
import type { MarkdownRendererProps } from 'types';

export function MarkdownRenderer({
    className,
    options,
    ...props
}: MarkdownRendererProps): React.JSX.Element {
    return (
        <div className={cn('markdown-prose', className)}>
            <MDXRemote
                {...props}
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            remarkGfm,
                            ...options?.mdxOptions?.remarkPlugins ?? []
                        ],
                    },
                    ...options?.mdxOptions
                }}
            />
        </div>
    );
}
