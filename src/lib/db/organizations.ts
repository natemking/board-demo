import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { OrganizationTable } from 'drizzle/schema';
import { revalidateOrganizationsCache } from 'lib/db/cache/organizations';

export async function insertOrganization(organization: typeof OrganizationTable.$inferInsert): Promise<void> {
    await db.insert(OrganizationTable).values(organization).onConflictDoNothing();
    revalidateOrganizationsCache(organization.id)
}

export async function updateOrganization(
    id: (typeof OrganizationTable.$inferInsert)['id'],
    organization: Partial<typeof OrganizationTable.$inferInsert>
): Promise<void> {
    await db.update(OrganizationTable).set(organization).where(eq(OrganizationTable.id, id));
    revalidateOrganizationsCache(id)
}

export async function deleteOrganization(id: (typeof OrganizationTable.$inferInsert)['id'],): Promise<void> {
    await db.delete(OrganizationTable).where(eq(OrganizationTable.id, id));
    revalidateOrganizationsCache(id)
}
