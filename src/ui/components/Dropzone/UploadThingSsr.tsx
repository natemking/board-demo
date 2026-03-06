import { Suspense } from 'react';
import { connection } from 'next/server';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { customFileRouter } from 'lib/services/upload-thing/router';

async function UtSSR(): Promise<React.JSX.Element> {
    await connection();
    return <NextSSRPlugin routerConfig={extractRouterConfig(customFileRouter)} />;
}

export function UploadThingSSR(): React.JSX.Element {
    return (
        <Suspense>
            <UtSSR />
        </Suspense>
    );
}
