'use client';

import type z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'components/shadcn/form';
import { newJobListingApplicationSchema } from 'lib/zSchema';
import type { NewJobListingApplicationFormProps } from 'types';
import { MarkdownEditor } from 'components/markdown/MarkdownEditor';
import { Button } from 'components/shadcn/button';
import { LoadingSwap } from 'components/LoadingSwap';

export function NewJobListingApplicationForm({
    jobListingId,
}: NewJobListingApplicationFormProps): React.JSX.Element {
    const form = useForm({
        resolver: zodResolver(newJobListingApplicationSchema),
        defaultValues: {
            coverLetter: '',

        }
    })

    const handleSubmit = async (data: z.infer<typeof newJobListingApplicationSchema>): Promise<void> => {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form className='space-y-6' onSubmit={e => void form.handleSubmit(onSubmit)(e)}>
                <FormField 
                    control={form.control}
                    name='coverLetter'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Letter</FormLabel>
                            <FormControl>
                                <MarkdownEditor {...field} markdown={field.value ?? ''} />
                            </FormControl>
                            <FormDescription>Optional</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className='w-full' disabled={form.formState.isSubmitting} type='submit'>
                    <LoadingSwap isLoading={form.formState.isSubmitting}>
                        Apply
                    </LoadingSwap>
                </Button>
            </form>
        </Form>
    );
}
