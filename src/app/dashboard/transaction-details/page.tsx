export default function TransactionDetails() {
    return (
        <>
            <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md">
                <h1 className="text-center sm:text-justify text-3xl font-bold text-gray-900 my-10 border-b-4 pb-4">Transaction Details</h1>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* Escrow Title */}
                        <div className="col-span-3 sm:col-span-6 will-change-transform">

                        </div>

                        {/* Role Dropdown */}
                        <div className="col-span-3 sm:col-span-2 will-change-transform inset-0 z-20">

                        </div>

                        {/* Currency Dropdown */}
                        <div className="col-span-3 sm:col-span-2 will-change-transform inset-0 z-10">

                        </div>

                        {/* Inspection Period */}
                        <div className="col-span-3 sm:col-span-2 will-change-transform">

                        </div>

                        <h2 className="col-span-3 sm:col-span-full text-xl font-semibold text-gray-900 border-b-2 pb-4">Transaction Summary</h2>

                        {/* Item Name */}
                        <div className="col-span-3 will-change-transform">

                        </div>

                        {/* Price */}
                        <div className="col-span-3 will-change-transform">

                        </div>

                        {/* Item Category Dropdown */}
                        <div className="col-span-3 sm:col-start-1 will-change-transform inset-0 z-[40]">

                        </div>

                        {/* Item Description */}
                        <div className="col-span-3 will-change-transform">

                        </div>

                        {/* Shipping Method Dropdown */}
                        <div className="col-span-3 sm:col-start-1 will-change-transform inset-0 z-20">

                        </div>

                        {/* Shipping Fee Paid By Dropdown */}
                        <div className="col-span-3 will-change-transform inset-0 z-10">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
