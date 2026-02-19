'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { toast } from 'sonner';
import { LoadingSwap } from 'components/LoadingSwap';
import {
    experienceLevels,
    jobListingTypes,
    locationRequirements,
    wageIntervals,
} from 'drizzle/schema';
import { MarkdownEditor } from 'components/markdown/MarkdownEditor';
import { Button } from 'components/shadcn/button';
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
import {
    formatExperienceLevel,
    formatJobListingsType,
    formatLocationRequirement,
    formatWageInterval,
} from 'lib/utils';
import states from 'lib/states.json';
import { jobListingFormZSchema } from 'lib/zSchema';
import { createJobListing, updateJobListing } from 'lib/actions/jobListing';
import type { JobListingFormProps } from 'types';

const NONE_SELECT_VALUE = 'none';

export function JobListingForm({ jobListing }: JobListingFormProps): React.JSX.Element {
    const form = useForm({
        resolver: zodResolver(jobListingFormZSchema),
        defaultValues: jobListing ?? {
            city: null,
            description: '',
            experienceLevel: 'junior',
            locationRequirement: 'in-office',
            stateAbbreviation: null,
            title: '',
            type: 'full-time',
            wage: null,
            wageInterval: 'yearly',
        },
    });

    const onSubmit = async (data: z.infer<typeof jobListingFormZSchema>): Promise<void> => {
        const action = jobListing ? updateJobListing.bind(null, jobListing.id) : createJobListing;

        const res = await action(data);
        if (res.error) {
            toast.error(res.message);
        }
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
                                                    onValueChange={val => {
                                                        intervalField.onChange(
                                                            val === '' ? null : val
                                                        );
                                                    }}
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
                <div className='grid grid-cols-1 items-start gap-x-4 gap-y-6 @md:grid-cols-2'>
                    <div className='grid grid-cols-1 items-start gap-x-2 gap-y-6 @xs:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='stateAbbreviation'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select
                                        onValueChange={val => {
                                            field.onChange(val === NONE_SELECT_VALUE ? null : val);
                                        }}
                                        value={field.value ?? ''}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {field.value !== null ? (
                                                <SelectItem
                                                    className='text-muted-foreground'
                                                    value={NONE_SELECT_VALUE}
                                                >
                                                    Clear
                                                </SelectItem>
                                            ) : null}

                                            {Object.entries(states).map(([abbrev, state]) => (
                                                <SelectItem
                                                    className='capitalize'
                                                    key={abbrev}
                                                    value={abbrev}
                                                >
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='locationRequirement'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Requirement</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {locationRequirements.map(lr => (
                                            <SelectItem
                                                className='capitalize'
                                                key={lr}
                                                value={lr}
                                            >
                                                {formatLocationRequirement(lr)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-1 items-start gap-x-4 gap-y-6 @md:grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {jobListingTypes.map(type => (
                                            <SelectItem
                                                className='capitalize'
                                                key={type}
                                                value={type}
                                            >
                                                {formatJobListingsType(type)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='experienceLevel'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Level</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {experienceLevels.map(level => (
                                            <SelectItem
                                                className='capitalize'
                                                key={level}
                                                value={level}
                                            >
                                                {formatExperienceLevel(level)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <MarkdownEditor
                                    {...field}
                                    markdown={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className='w-full'
                    disabled={form.formState.isSubmitting}
                    type='submit'
                >
                    <LoadingSwap isLoading={form.formState.isSubmitting}>
                        {`${jobListing ? 'Edit' : 'Create'} Job Listing`}
                    </LoadingSwap>
                </Button>
            </form>
        </Form>
    );
}
