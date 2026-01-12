import type { DeletedObjectJSON, UserJSON } from '@clerk/nextjs/server'

export type ClerkWebhookData<T> = {
    data: {
        data: T,
        headers: Record<string, string>,
        raw: string,
    }
}

export type Events = {
    'clerk/user.created': ClerkWebhookData<UserJSON>
    'clerk/user.updated': ClerkWebhookData<UserJSON>
    'clerk/user.deleted': ClerkWebhookData<DeletedObjectJSON>,
}