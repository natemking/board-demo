import { Suspense } from 'react';
import { OrganizationList } from '@clerk/nextjs';
import { employerUrl } from 'lib/constants';
import type { OrganizationsSelectPageProps } from 'types';

export default function OrganizationsSelectPage(
    props: OrganizationsSelectPageProps
): React.JSX.Element {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

async function SuspendedPage({
    searchParams,
}: OrganizationsSelectPageProps): Promise<React.JSX.Element> {
    const { redirect } = await searchParams;
    const redirectUrl = redirect ?? employerUrl;

    return (
        <OrganizationList
            afterCreateOrganizationUrl={redirectUrl}
            afterSelectOrganizationUrl={redirectUrl}
            hidePersonal
            skipInvitationScreen
        />
    );
}
