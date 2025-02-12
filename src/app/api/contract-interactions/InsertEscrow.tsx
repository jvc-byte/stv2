import { client } from "@/lib/client";
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { useCallback } from 'react';

type EscrowData = {
    title: string;
    role: string;
    currency: string;
    inspectionPeriod: number;
    itemName: string;
    price: number;
    itemCategory: string;
    itemDescription: string;
    shippingMethod: string;
    shippingFeePaidBy: string;
};

export default function InsertEscrow(escrowData: EscrowData) {
    const { mutate: sendTransaction, isPending, isError, error } = useSendTransaction();

    const onClick = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission

        // Get the contract instance outside of any DOM operations
        const contract = getContract({ 
            client: client, 
            chain: baseSepolia, 
            address: CREATE_ESCROW_CONTRACT_ADDRESS 
        });

        // Prepare the contract call
        const createEscrow = prepareContractCall({
            contract,
            method: "function createEscrow(string _title, string _role, string _currency, uint256 _inspection_period, string _item_name, uint256 _price, string _item_category, string _item_description, string _shipping_method, string _shipping_fee_paid_by) returns (uint256)",
            params: [
                escrowData.title,
                escrowData.role,
                escrowData.currency,
                BigInt(escrowData.inspectionPeriod),
                escrowData.itemName,
                BigInt(escrowData.price),
                escrowData.itemCategory,
                escrowData.itemDescription,
                escrowData.shippingMethod,
                escrowData.shippingFeePaidBy,
            ],
        });

        // Send the transaction
        sendTransaction(createEscrow, {
            onSuccess: (receipt) => {
                console.log("Transaction successful! Receipt:", receipt);
            },
            onError: (error) => {
                console.error("Transaction failed:", error);
            },
        });
    }, [escrowData, sendTransaction]);

    return (
        <div className="will-change-transform">
            <button 
                type="button"
                className="btn hover:btn-success btn-wide hover:text-white text-white bg-green-500 text-base font-medium"
                onClick={onClick}
                disabled={isPending}
            >
                {isPending ? "Creating Escrow..." : "Create Escrow"}
            </button>
            {isError && (
                <p className="text-red-500 mt-2">
                    Error: {error.message}
                </p>
            )}
        </div>
    );
}