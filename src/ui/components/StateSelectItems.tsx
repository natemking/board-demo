import { SelectItem } from 'components/shadcn/select';
import states from 'lib/states.json';

export function StateSelectItems(): React.JSX.Element {
    return (
        <>
            {Object.entries(states).map(([abbrev, state]) => (
                <SelectItem
                    className='capitalize'
                    key={abbrev}
                    value={abbrev}
                >
                    {state}
                </SelectItem>
            ))}
        </>
    );
}
