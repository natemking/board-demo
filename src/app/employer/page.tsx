import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { employerJobListingsUrl, employerJobListingsNewUrl } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { getMostRecentJobListingByOrgId } from 'lib/actions/jobListing';

export default function EmployerHomePage(): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

async function SuspendedPage(): Promise<React.JSX.Element | null> {
    const { orgId } = await getCurrentOrganization();

    if (!orgId) return null;

    const jobListing = await getMostRecentJobListingByOrgId(orgId);

    if (!jobListing) redirect(employerJobListingsNewUrl);

    redirect(`${employerJobListingsUrl}/${jobListing.id}`);
}
