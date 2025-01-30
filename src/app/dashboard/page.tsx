import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import TransactionTable from "../components/dashboard/transactions/transaction-table";

const navLinks = [
    { name: 'All', href: '#' },
    { name: 'Action Required', href: '#' },
    { name: 'Open', href: '#' },
    { name: 'Closed', href: '#' },
]


export default function Dash() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-6xl my-6 px-4 sm:px-6 lg:px-8">
            <div className="">
                <h1 className="text-3xl font-bold text-gray-900 my-10">My Transactions</h1>
                <div className=" flex gap-4 mt-1 text-sm border-b border-gray-400 mb-6">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="flex items-center justify-center p-4 hidden sm:block md:ml-24">
                        <div className="flex">
                            <input
                                type="text"
                                id="transaction-search"
                                className="w-full max-w-xs px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-l-lg border-r-0 focus:outline-none"
                                placeholder="Search Transaction"
                                aria-label="Search transactions"
                            />

                            <select
                                className="py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-r-lg focus:outline-none"
                                aria-label="Filter transactions"
                                defaultValue=""
                            >
                                <option value="" disabled>Filter</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                                <option value="broker">Broker</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4 block sm:hidden">
                    <div className="flex">
                        <input
                            type="text"
                            id="transaction-search"
                            className="w-full max-w-xs px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-l-lg border-r-0 focus:outline-none"
                            placeholder="Search Transaction"
                            aria-label="Search transactions"
                        />

                        <select
                            className="py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-r-lg focus:outline-none"
                            aria-label="Filter transactions"
                            defaultValue=""
                        >
                            <option value="" disabled>Filter</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="broker">Broker</option>
                        </select>
                    </div>
                </div>
                <TransactionTable />
            </div>
        </div>
    );
}
