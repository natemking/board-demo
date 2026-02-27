import z from 'zod';
import {
    experienceLevels,
    jobListingTypes,
    locationRequirements,
    wageIntervals,
} from 'drizzle/schema';

const commonErrMsgs = {
    required: 'Required',
    requireForNonRemote: 'Required for non-remote listings.',
} as const;

export const jobListingFormZSchema = z
    .object({
        title: z.string().min(1, { message: commonErrMsgs.required }),
        description: z.string().min(1, { message: commonErrMsgs.required }),
        experienceLevel: z.enum(experienceLevels),
        locationRequirement: z.enum(locationRequirements),
        type: z.enum(jobListingTypes),
        wage: z.number().int().positive().min(1).nullable(),
        wageInterval: z.enum(wageIntervals).nullable(),
        stateAbbreviation: z
            .string()
            .transform(val => (val.trim() === '' ? null : val))
            .nullable(),
        city: z
            .string()
            .transform(val => (val.trim() === '' ? null : val))
            .nullable(),
    })
    .refine(
        listing => {
            return listing.locationRequirement === 'remote' || listing.city !== null;
        },
        {
            message: commonErrMsgs.requireForNonRemote,
            path: ['city'],
        }
    )
    .refine(
        listing => {
            return listing.locationRequirement === 'remote' || listing.stateAbbreviation !== null;
        },
        {
            message: commonErrMsgs.requireForNonRemote,
            path: ['stateAbbreviation'],
        }
    );

export const jobListingsSearchParamsSchema = z.object({
    title: z.string().optional().catch(undefined),
    city: z.string().optional().catch(undefined),
    state: z.string().optional().catch(undefined),
    experience: z.enum(experienceLevels).optional().catch(undefined),
    locationRequirement: z.enum(locationRequirements).optional().catch(undefined),
    type: z.enum(jobListingTypes).optional().catch(undefined),
    jobIds: z
        .union([z.string(), z.array(z.string())])
        .transform(v => (Array.isArray(v) ? v : [v]))
        .optional()
        .catch([]),
});
