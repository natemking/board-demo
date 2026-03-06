import { Suspense } from 'react';
import { connection } from 'next/server';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { customFileRouter } from 'lib/services/upload-thing/router';

async function UtSsr(): Promise<React.JSX.Element> {
    await connection();
    return <NextSSRPlugin routerConfig={extractRouterConfig(customFileRouter)} />;
}

export function UploadThingSsr(): React.JSX.Element {
    return (
        <Suspense>
            <UtSsr />
        </Suspense>
    );
}
