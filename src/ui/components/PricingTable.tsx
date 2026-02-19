'use client';

import { PricingTable as ClerkPricingTable } from '@clerk/nextjs';
import { employerPricingUrl } from 'lib/constants';

export function PricingTable(): React.JSX.Element {
    return (
        <ClerkPricingTable
            for='organization'
            newSubscriptionRedirectUrl={employerPricingUrl}
        />
    );
}
