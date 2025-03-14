import EscrowDetails from "@/app/components/dashboard/transactions/EscrowDetails";
import { Suspense } from "react";

export default function TransactionDetails() {
    return (
        <>
            <Suspense fallback={<div className="text-center font-bold text-gray-500">Loading...</div>} >
                <EscrowDetails />
            </Suspense>
        </>
    )
};