import {
    SignUpButton as ClerkSignUpButton,
    SignInButton as ClerkSignInButton,
    SignOutButton as ClerkSignOutButton,
} from '@clerk/nextjs';
import { Button } from 'components/shadcn/button';
import type { SignInButtonProps, SignOutButtonProps, SignUpButtonProps } from 'types';

export function SignUpButton({
    children = <Button>Sign Up</Button>,
    ...props
}: SignUpButtonProps): React.JSX.Element {
    return <ClerkSignUpButton {...props}>{children}</ClerkSignUpButton>;
}
export function SignInButton({
    children = <Button>Sign In</Button>,
    ...props
}: SignInButtonProps): React.JSX.Element {
    return <ClerkSignInButton {...props}>{children}</ClerkSignInButton>;
}
export function SignOutButton({
    children = <Button>Sign Out</Button>,
    ...props
}: SignOutButtonProps): React.JSX.Element {
    return <ClerkSignOutButton {...props}>{children}</ClerkSignOutButton>;
}
