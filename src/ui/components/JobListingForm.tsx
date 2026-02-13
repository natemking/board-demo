'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'components/shadcn/form';
import { jobListingFormZSchema } from 'lib/zSchema';

export function JobListingForm(): React.JSX.Element {
    const form = useForm({
        resolver: zodResolver(jobListingFormZSchema)
    })
    return (
        <Form {...form}>
            Enter
        </Form>
    );
}