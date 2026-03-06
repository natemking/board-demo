import { createRouteHandler } from 'uploadthing/next';
import { customFileRouter } from 'services/upload-thing/router';

export const { GET, POST } = createRouteHandler({
    router: customFileRouter,
});
