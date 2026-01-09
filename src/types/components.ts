import type { ComponentProps } from 'react';
import type { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import type { CompositionalComponent } from './index';

// clerk components
export type ClerkProviderProps = CompositionalComponent;
export type SignedOutStatusProps = CompositionalComponent;
export type SignedInStatusProps = CompositionalComponent;
export type SignUpButtonProps = CompositionalComponent & ComponentProps<typeof SignUpButton>
export type SignInButtonProps = CompositionalComponent & ComponentProps<typeof SignInButton>
export type SignOutButtonProps = CompositionalComponent & ComponentProps<typeof SignOutButton>

// components
export type AppSidebarClientProps = CompositionalComponent;
export type SidebarUserButtonClientProps = {
    user: {
        email: string;
        imageUrl: string;
        name: string;
    };
};
