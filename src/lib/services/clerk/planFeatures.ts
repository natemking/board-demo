import { auth } from '@clerk/nextjs/server';
import type { PlanFeature } from 'types';

export async function hasPlanFeature(feature: PlanFeature): Promise<boolean> {
    const { has } = await auth()

    return has({ feature })
}