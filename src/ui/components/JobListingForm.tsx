'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { wageIntervals } from 'drizzle/schema';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/shadcn/form';
import { Input } from 'components/shadcn/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'components/shadcn/select';
import { jobListingFormZSchema } from 'lib/zSchema';
import { formatWageInterval } from 'lib/utils';

export function JobListingForm(): React.JSX.Element {
    const form = useForm({
        resolver: zodResolver(jobListingFormZSchema),
        defaultValues: {
            city: null,
            description: '',
            experienceLevel: 'junior',
            locationRequirements: 'in-office',
            stateAbbreviation: null,
            title: '',
            type: 'full-time',
            wage: null,
            wageInterval: 'yearly',
        },
    });

    const onSubmit = (data: z.infer<typeof jobListingFormZSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                className='@container space-y-6'
                onSubmit={e => void form.handleSubmit(onSubmit)(e)}
            >
                <div className='grid grid-cols-1 items-start gap-x-4 gap-y-6 @md:grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='wage'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wage</FormLabel>
                                <div className='flex'>
                                    <FormControl>
                                        <Input
                                            className='rounded-r-none'
                                            {...field}
                                            onChange={e => {
                                                const { valueAsNumber } = e.target;

                                                field.onChange(
                                                    isNaN(valueAsNumber) ? null : valueAsNumber
                                                );
                                            }}
                                            type='number'
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormField
                                        control={form.control}
                                        name='wageInterval'
                                        render={({ field: intervalField }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={intervalField.onChange}
                                                    value={intervalField.value ?? ''}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className='rounded-l-none capitalize'>
                                                            / <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {wageIntervals.map(interval => (
                                                            <SelectItem
                                                                className='capitalize'
                                                                key={interval}
                                                                value={interval}
                                                            >
                                                                {formatWageInterval(interval)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormDescription>Optional</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}
