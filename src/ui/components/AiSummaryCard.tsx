import { notFound } from 'next/navigation';
import { getUserResume } from 'lib/actions/userResume';
import { getCurrentUser } from 'lib/services/clerk/getCurrentAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/shadcn/card';
import { MarkdownRenderer } from 'components/markdown/MarkdownRenderer';

export async function AiSummaryCard(): Promise<React.JSX.Element | null> {
    const { userId } = await getCurrentUser();
    if (!userId) return notFound();

    const userResume = await getUserResume(userId);
    if (!userResume?.aiSummary) return null;

    return (
        <Card>
            <CardHeader className='border-b'>
                <CardTitle>AI Summary</CardTitle>
                <CardDescription>
                    This is an AI-generated summary of your resume. This is used by employers to
                    understand your qualifications and experience.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MarkdownRenderer source={userResume.aiSummary} />
            </CardContent>
        </Card>
    );
}
