import { Webhook } from 'svix';
import { NonRetriableError } from 'inngest';
import { insertUser } from 'db/user';
import { insertUserNotificationsSettings } from 'db/userNotificationSettings';
import { inngest } from 'services/inngest/client';
import { env } from 'env/server';
import type { ClerkWebhookData } from 'types';

function verifyWebhook<T>({
    raw,
    headers,
}: Pick<ClerkWebhookData<T>['data'], 'raw' | 'headers'>): unknown {
    return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
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
            try {
                await verifyWebhook(event.data);
            } catch (err) {
                throw new NonRetriableError('Invalid webhook');
            }
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
