
import { inngest } from 'services/inngest/client';




export const clerkCreateUser = inngest.createFunction(
    {
        id: 'clerk/create-db-user',
        name: 'Clerk - Create DB User',
    },
    {
        event: 'clerk/user.created',
    },
    async ({ event, step }) => {

    }
);
