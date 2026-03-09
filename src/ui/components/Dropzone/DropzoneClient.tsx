'use client';

import { useRouter } from 'next/navigation';
import { UploadDropzone } from 'components/Dropzone/UploadThing';

export function DropzoneClient(): React.JSX.Element {
    const router = useRouter();

    return (
        <UploadDropzone
            endpoint='resumeUploader'
            onClientUploadComplete={() => {
                router.refresh();
            }}
        />
    );
}
