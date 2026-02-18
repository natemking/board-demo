import { auth } from '@clerk/nextjs/server';
import type { UserPermission } from 'types';

export async function hasOrgUserPermissions(permission: UserPermission): Promise<boolean> {
    const { has } = await auth()

    return has({ permission })
}