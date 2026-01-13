import { eq } from 'drizzle-orm';
import { db } from 'drizzle/db';
import { UserTable } from 'drizzle/schema';
import { revalidateUserCache } from 'db/cache/user';

// insert user but if conflict on userId (already exits), then do an UPSERT
// await db.insert(UserTable).values(user).onConflictDoUpdate({
//     target: UserTable.id,
//     set: user,
// });

export async function insertUser(user: typeof UserTable.$inferInsert): Promise<void> {
    await db.insert(UserTable).values(user).onConflictDoNothing();
    revalidateUserCache(user.id)
}

export async function updateUser(
    id: (typeof UserTable.$inferInsert)['id'],
    user: Partial<typeof UserTable.$inferInsert>
): Promise<void> {
    await db.update(UserTable).set(user).where(eq(UserTable.id, id));
    revalidateUserCache(id)
}

export async function deleteUser(id: (typeof UserTable.$inferInsert)['id'],): Promise<void> {
    await db.delete(UserTable).where(eq(UserTable.id, id));
    revalidateUserCache(id)
}
