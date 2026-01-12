import { db } from 'drizzle/db';
import { UserTable } from 'drizzle/schema';

export async function insertUser(user: typeof UserTable.$inferInsert): Promise<void> {
    // insert user but if conflict on userId (already exits), then do an UPSERT
    await db.insert(UserTable).values(user).onConflictDoNothing();
}

// insert user but if conflict on userId (already exits), then do an UPSERT
// await db.insert(UserTable).values(user).onConflictDoUpdate({
//     target: UserTable.id,
//     set: user,
// });
