import type { CompositionalComponent } from 'types';

export default function ClerkLayout({ children }: CompositionalComponent): React.JSX.Element {
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div>{children}</div>
        </div>
    );
}
