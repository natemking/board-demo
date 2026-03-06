import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getCurrentUser } from 'services/clerk/getCurrentAuth';
import { inngest } from 'services/inngest/client';
import { upsertUserResume } from 'lib/db/userResumes';
import { getUserResumeFileKey } from 'lib/actions/userResume';
import { uploadThing } from 'lib/services/upload-thing/client';

const f = createUploadthing();

export const customFileRouter = {
    resumeUploader: f(
        {
            pdf: {
                maxFileSize: '8MB',
                maxFileCount: 1,
            },
        },
        { awaitServerData: true }
    )
        .middleware(async () => {
            const { userId } = await getCurrentUser();

            if (!userId) throw new UploadThingError('Unauthorized') as Error;

            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { userId } = metadata;

            const resumeFileKey = await getUserResumeFileKey(userId);

            if (resumeFileKey) {
                await uploadThing.deleteFiles(resumeFileKey)
            }

            await upsertUserResume(userId, {
                resumeFileUrl: file.ufsUrl,
                resumeFileKey: file.key,
            });

            //TODO: Delete old resume

            await inngest.send({
                name: 'app/resume.uploaded',
                user: {
                    id: userId,
                },
            });

            return { message: 'Resume uploaded successfully' };
        }),
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;
