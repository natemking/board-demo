import { Webhook } from 'svix';
import { NonRetriableError } from 'inngest';
import { deleteUser, insertUser, updateUser } from 'db/user';
import { insertUserNotificationsSettings } from 'db/userNotificationSettings';
import { inngest } from 'services/inngest/client';
import { env } from 'env/server';
import type { ClerkWebhookData } from 'types';

async function verifyWebhook<T>({
    raw,
    headers,
}: Pick<ClerkWebhookData<T>['data'], 'raw' | 'headers'>): Promise<void> {
    try {
        await new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
    } catch (err) {
        throw new NonRetriableError('Invalid webhook');
    }
}
export const clerkCreateUser = inngest.createFunction(
    {
        id: 'clerk/create-db-user',
        name: 'Clerk - Create DB User',
    },
    {
        event: 'clerk/user.created',
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async (): Promise<void> => {
            await verifyWebhook(event.data);
        });

        const userId = await step.run('create-user', async (): Promise<string> => {
            const userData = event.data.data;
            const email = userData.email_addresses.find(
                em => em.id === userData.primary_email_address_id
            );

            if (!email) {
                throw new NonRetriableError('No primary email address found');
            }

            await insertUser({
                id: userData.id,
                name: `${userData.first_name ?? ''} ${userData.last_name ?? ''}`,
                imageUrl: userData.image_url,
                email: email.email_address,
                createdAt: new Date(userData.created_at),
                updatedAt: new Date(userData.updated_at),
            });

            return userData.id;
        });

        await step.run('create-user-notification-settings', async () => {
            await insertUserNotificationsSettings({ userId });
        });
    }
);

export const clerkUpdateUser = inngest.createFunction(
    {
        id: 'clerk/update-db-user',
        name: 'Clerk - Update DB User',
    },
    {
        event: 'clerk/user.updated',
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async (): Promise<void> => {
            await verifyWebhook(event.data);
        });

        await step.run('update-user', async (): Promise<void> => {
            const userData = event.data.data;
            const email = userData.email_addresses.find(
                em => em.id === userData.primary_email_address_id
            );

            if (!email) {
                throw new NonRetriableError('No primary email address found');
            }

            await updateUser(userData.id, {
                name: `${userData.first_name ?? ''} ${userData.last_name ?? ''}`,
                imageUrl: userData.image_url,
                email: email.email_address,
                updatedAt: new Date(userData.updated_at),
            });
        });
    }
);

export const clerkDeleteUser = inngest.createFunction(
    {
        id: 'clerk/delete-db-user',
        name: 'Clerk - Delete DB User',
    },
    {
        event: 'clerk/user.deleted',
    },
    async ({ event, step }) => {
        await step.run('verify-webhook', async (): Promise<void> => {
            await verifyWebhook(event.data);
        });

        await step.run('delete-user', async (): Promise<void> => {
            const { id } = event.data.data;

            if (!id) {
                throw new NonRetriableError('No id found');
            }

            await deleteUser(id) 
        });
    }
);
