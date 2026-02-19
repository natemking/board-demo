import Link from 'next/link';
import { Button } from 'components/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/popover';
import { employerPricingUrl } from 'lib/constants';
import type { UpgradePopoverProps } from 'types';

export function UpgradePopover({
    buttonText,
    popoverText,
}: UpgradePopoverProps): React.JSX.Element {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>{buttonText}</Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-2'>
                {popoverText}
                <Button asChild>
                    <Link href={employerPricingUrl}>Upgrade</Link>
                </Button>
            </PopoverContent>
        </Popover>
    );
}
