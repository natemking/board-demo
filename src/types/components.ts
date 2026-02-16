import type { ComponentProps, ReactNode, Ref } from 'react';
import type { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import type { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import type { OrganizationTable, UserTable } from 'drizzle/schema';
import type { CompositionalComponent } from './index';

// clerk components
export type ClerkProviderProps = CompositionalComponent;
export type SignedOutStatusProps = CompositionalComponent;
export type SignedInStatusProps = CompositionalComponent;
export type SignUpButtonProps = CompositionalComponent & ComponentProps<typeof SignUpButton>;
export type SignInButtonProps = CompositionalComponent & ComponentProps<typeof SignInButton>;
export type SignOutButtonProps = CompositionalComponent & ComponentProps<typeof SignOutButton>;

// components
export type AppSidebarClientProps = CompositionalComponent;
export type AppSidebarProps = CompositionalComponent & {
    content: ReactNode;
    footerButton: ReactNode;
};
export type InternalMarkDownEditorProps = MDXEditorProps & {
    editorRef?: Ref<MDXEditorMethods>;
};
export type SidebarNavGroupProps = {
    className?: string;
    items: {
        href: string;
        icon: ReactNode;
        label: string;
        authStatus?: 'signedOut' | 'signedIn';
    }[];
};
export type SidebarUserButtonClientProps = {
    user: typeof UserTable.$inferSelect;
};
export type SidebarOrganizationButtonClientProps = {
    user: Pick<typeof UserTable.$inferSelect, 'email'>;
    organization: Pick<typeof OrganizationTable.$inferSelect, 'name'> & { imageUrl: string | null };
};
