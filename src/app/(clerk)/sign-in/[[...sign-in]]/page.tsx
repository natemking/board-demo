import { SignIn } from '@clerk/nextjs';
import { connection } from 'next/server'


export default async function SignInPage(): Promise<React.JSX.Element> {
    await connection();
    return <SignIn />;
}
