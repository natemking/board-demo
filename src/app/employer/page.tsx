import { Suspense } from 'react';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';

export default function EmployerHomePage(): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    )
}

async function SuspendedPage(): Promise<React.JSX.Element | null> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return null

    return <h1>Goodbye Employer</h1>;
}
