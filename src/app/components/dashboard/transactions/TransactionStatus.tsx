import { ArrowUturnLeftIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';



// Here’s a unique color assigned to each status:

// 🟤 Brown – not_initiated
// 🟥 Red – awaiting_payment
// 🟠 Orange – payment_recieved
// 🟡 Gold – awaiting_delivery
// 🟩 Lime Green – delivered
// 🟦 Sky Blue – awaiting_buyer_confirmation
// 🟢 Emerald Green – Buyer_approved
// 🟣 Purple – Dispute_initiated
// 🟡 Mustard Yellow – uder_review (assuming "under_review")
// 🟤 Dark Brown – resolved
// ⬛ Black – cancelled
// ⚪ White – expired
// 🟧 Dark Orange – funds_released_to_seller
// 🟪 Violet – funds_refunded_to_buyer
// 🔵 Deep Blue – completed
// 🔴 Dark Red – on_hold
// 🔶 Amber – awaiting_additional_information
// ⚫ Charcoal Grey – failed
// 🟨 Pale Yellow – partially_released
// 🟫 Copper – reversed

export default function TransactionStatus({ status }: { status: string }) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-orange-500 text-white-700': status === '0',
                    'bg-orange-600 text-white': status === '1',
                    'bg-orange-500 text-white': status === '2',
                    'bg-yellow-500 text-white': status === '3',
                    'bg-yellow-600 text-white': status === '4',
                    'bg-orange-500 text-white-500': status === '5',
                    'bg-green-500 text-white': status === '6',
                    'bg-orange-500 text-white-600': status === '7',
                    'bg-orange-400 text-white': status === '8',
                    'bg-green-500 text-white-500': status === '9',
                    'bg-red-500 text-white': status === '10',
                    'bg-blue-500 text-white': status === '11',
                    'bg-green-500 text-white-600': status === '12',
                    'bg-green-500 text-white-700': status === '13',
                    'bg-orange-400 text-white-700': status === '14',
                    'bg-orange-500 text-white-800': status === '15',
                    'bg-red-500 text-white-800': status === '16',
                    'bg-blue-500 text-white-800': status === '17',
                    'bg-red-500 text-white-900': status === '18',
                },
            )}
        >
            {status === '0' ? (<> Not Initialized <ClockIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '1' ? (<> Awaiting Payment <ClockIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '2' ? (<> Paid <CheckCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '3' ? (<> Cancelled <XCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '4' ? (<> Refunded <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
        </span>
    );
}
