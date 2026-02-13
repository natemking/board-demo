import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { employerJobListings, employerJobListingsNew } from 'lib/constants';
import { getCurrentOrganization } from 'lib/services/clerk/getCurrentAuth';
import { getMostRecentJobListingByOrgId } from 'lib/actions';

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

    if (!jobListing) redirect(employerJobListingsNew);

    redirect(`${employerJobListings}/${jobListing.id}`);
}
