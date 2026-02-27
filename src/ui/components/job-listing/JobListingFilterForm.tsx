'use client';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import type z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceLevels, jobListingTypes, locationRequirements } from 'drizzle/schema';
import type { ExperienceLevel, JobListingType, LocationRequirement } from 'drizzle/schema';
import { StateSelectItems } from 'components/StateSelectItems';
import {
    Form,
    FormControl,
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
import { ANY_VALUE } from 'lib/constants';
import { formatExperienceLevel, formatJobListingsType, formatLocationRequirement } from 'lib/utils';
import { jobListingFilterSchema } from 'lib/zSchema';
import { Button } from 'components/shadcn/button';
import { LoadingSwap } from 'components/LoadingSwap';

function SelectItemAny(): React.JSX.Element {
    return (
        <SelectItem
            className='capitalize'
            value={ANY_VALUE}
        >
            {`${ANY_VALUE.charAt(0).toUpperCase()}${ANY_VALUE.slice(1)}`}
        </SelectItem>
    );
}

export function JobListingFilterForm(): React.JSX.Element {
    const searchParams = useSearchParams();

    const form = useForm({
        resolver: zodResolver(jobListingFilterSchema),
        defaultValues: {
            title: searchParams.get('title') ?? '',
            city: searchParams.get('city') ?? '',
            locationRequirement:
                (searchParams.get('locationRequirement') as LocationRequirement | null) ??
                ANY_VALUE,
            stateAbbreviation: searchParams.get('state') ?? ANY_VALUE,
            experienceLevel:
                (searchParams.get('experience') as ExperienceLevel | null) ?? ANY_VALUE,
            type: (searchParams.get('type') as JobListingType | null) ?? ANY_VALUE,
        },
    });

    const onSubmit = async (data: z.infer<typeof jobListingFilterSchema>): Promise<void> => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                className='space-y-6'
                onSubmit={e => void form.handleSubmit(onSubmit)(e)}
            >
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
                                    <SelectItemAny />
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
                <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItemAny />
                                    <StateSelectItems />
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
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
                                    <SelectItemAny />
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
                                    <SelectItemAny />
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
                <Button
                    className='w-full'
                    disabled={form.formState.isSubmitting}
                    type='submit'
                >
                    <LoadingSwap isLoading={form.formState.isSubmitting}>
                        Filter
                    </LoadingSwap>
                </Button>
            </form>
        </Form>
    );
}
