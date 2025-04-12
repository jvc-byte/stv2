import { CircleStackIcon } from '@heroicons/react/16/solid';
import { ArrowsRightLeftIcon, ArrowUturnLeftIcon, CheckCircleIcon, ClockIcon, InformationCircleIcon, NoSymbolIcon, PauseCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
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
                    'bg-gray-500 text-white': status === '0',
                    'bg-orange-600 text-white': status === '1',
                    'bg-orange-500 text-white': status === '2',
                    'bg-cyan-500 text-white': status === '3',
                    'bg-yellow-600 text-white': status === '4',
                    'bg-blue-500 text-white': status === '5',
                    'bg-green-600 text-white': status === '6',
                    'bg-orange-700 text-white': status === '7',
                    'bg-orange-400 text-white': status === '8',
                    'bg-red-600 text-white': status === '9',
                    'bg-blue-600 text-white': status === '10',
                    'bg-red-500 text-white': status === '11',
                    'bg-gray-400 text-white': status === '12',
                    'bg-green-400 text-white': status === '13',
                    'bg-purple-600 text-white': status === '14',
                    'bg-yellow-700 text-white': status === '15',
                    'bg-stone-500 text-white': status === '16',
                    'bg-red-500 text-gray-100': status === '17',
                    'bg-violet-500 text-white': status === '18',
                },
            )}
        >
            {status === '0' ? (<> Escrow Initialized <NoSymbolIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '1' ? (<> Seller Reviewing <ClockIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '2' ? (<> Awaiting Payment <ClockIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '3' ? (<> Payment Processing <ClockIcon className="ml-1 w-4 text-white-800" /></>) : null}
            {status === '4' ? (<> Payment Completed <CheckCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '5' ? (<> Delivering <CircleStackIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '6' ? (<> Buyer Confirming <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '7' ? (<> Buyer Approved <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '8' ? (<> In Dispute <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '9' ? (<> Under Review <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '10' ? (<> Dispute Resolved <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '11' ? (<> Cancelled <XCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '12' ? (<> Expired <XCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '13' ? (<> Fund Released <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '14' ? (<> Completed <ArrowUturnLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '15' ? (<> On Hold <PauseCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '16' ? (<> Awaiting Some Info <InformationCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '17' ? (<> Payment Failed <XCircleIcon className="ml-1 w-4 text-white" /> </>) : null}
            {status === '18' ? (<> Partially Released <ArrowsRightLeftIcon className="ml-1 w-4 text-white" /> </>) : null}
        </span>
    );
}
