import type { ComponentProps, ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import type { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type {
    JobListingStatus,
    JobListingTable,
    OrganizationTable,
    UserTable,
} from 'drizzle/schema';
import type { Button } from 'components/shadcn/button';
import type { BasicError, CompositionalComponent } from './index';

// clerk components
export type ClerkProviderProps = CompositionalComponent;
export type SignedOutStatusProps = CompositionalComponent;
export type SignedInStatusProps = CompositionalComponent;
export type SignUpButtonProps = CompositionalComponent & ComponentProps<typeof SignUpButton>;
export type SignInButtonProps = CompositionalComponent & ComponentProps<typeof SignInButton>;
export type SignOutButtonProps = CompositionalComponent & ComponentProps<typeof SignOutButton>;

// components
export type ActionButtonProps = Omit<ComponentPropsWithRef<typeof Button>, 'onClick'> & {
    action: () => Promise<BasicError>;
    requireAreYouSure?: boolean;
    areYouSureDescription?: string;
};

export type AppSidebarClientProps = CompositionalComponent;

export type AppSidebarProps = CompositionalComponent & {
    content: ReactNode;
    footerButton: ReactNode;
};

export type AsyncIfProps = CompositionalComponent & {
    condition: () => Promise<boolean>;
    loadingFallback?: ReactNode;
    otherwise?: ReactNode;
};

export type InternalMarkDownEditorProps = MDXEditorProps & {
    editorRef?: Ref<MDXEditorMethods>;
};

export type JobListingBadgesProps = {
    jobListing: Pick<
        typeof JobListingTable.$inferSelect,
        | 'city'
        | 'experienceLevel'
        | 'isFeatured'
        | 'locationRequirement'
        | 'stateAbbreviation'
        | 'type'
        | 'wage'
        | 'wageInterval'
    >;
} & { className?: string };

export type JobListingBaseButtonProps = {
    jobListingId: string;
};

export type JobListingFeatureToggleButtonProps = JobListingBaseButtonProps & {
    isFeatured: boolean;
};

export type JobListingFormProps = {
    jobListing?: Pick<
        typeof JobListingTable.$inferSelect,
        | 'city'
        | 'description'
        | 'experienceLevel'
        | 'id'
        | 'locationRequirement'
        | 'stateAbbreviation'
        | 'title'
        | 'type'
        | 'wage'
        | 'wageInterval'
    >;
};

export type JobListingMenuProps = {
    orgId: string;
};

export type JobListingStatusUpdateButtonProps = JobListingBaseButtonProps & {
    status: JobListingStatus;
};

export type LoadingSwapProps = CompositionalComponent & {
    className?: string;
    isLoading: boolean;
};


export type MarkdownPartialProps = {
    dialogMarkdown: ReactNode;
    dialogTitle: string;
    mainMarkdown: ReactNode;
};

export type MarkdownRendererProps = MDXRemoteProps & {
    className?: string;
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

export type UpgradePopoverProps = {
    buttonText: ReactNode;
    popoverText: ReactNode;
};
