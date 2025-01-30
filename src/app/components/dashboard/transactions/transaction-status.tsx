import { ArrowUturnLeftIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TransactionStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-300 text-gray-800': status === 'pending',
                    'bg-green-500 text-white': status === 'paid',
                    'bg-orange-500 text-white': status === 'cancelled',
                    'bg-red-500 text-white': status === 'reversed',
                },
            )}
        >
            {status === 'pending' ? (<> Pending <ClockIcon className="ml-1 w-4 text-gray-800" /></>) : null}
            {status === 'paid' ? (<> Paid <CheckCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === 'cancelled' ? (<> Cancelled <XCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === 'reversed' ? (<> Reversed <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
        </span>
    );
}
