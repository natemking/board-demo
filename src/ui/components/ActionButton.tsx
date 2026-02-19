// 'use client';

// import { useTransition } from 'react';
// import { toast } from 'sonner';
// import type { ActionButtonProps } from 'types';

// export function ActionButton({
//     action,
//     areYouSureDescription = 'This action cannot be undone',
//     requireAreYouSure = false,
//     ...props
// }: ActionButtonProps): React.JSX.Element {
//     const [isLoading, startTransition] = useTransition();

//     function performAction(): void {
//         startTransition(async () => {
//             const data = await action();
//             if (data.error) {
//                 toast.error(data.message ?? 'Unknown Error')
//             }
//         })
//     }

//     return <div>Enter</div>;
// }
