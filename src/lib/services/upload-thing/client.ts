import { UTApi } from 'uploadthing/server';
import { env } from 'lib/env/server';

export const uploadThing = new UTApi({
    token: env.UPLOADTHING_TOKEN,
});
