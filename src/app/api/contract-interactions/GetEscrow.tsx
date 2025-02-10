'use client'
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains"
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { useEffect } from 'react';

export default function GetEscrow() {
    const contract = getContract({ client: client, chain: baseSepolia, address: CREATE_ESCROW_CONTRACT_ADDRESS })

    const { data: Escrow, isPending } = useReadContract({
        contract,
        method: "function getEscrowData(uint256) view returns (address initiator, string transaction_title, string role, string currency, uint256 inspection_period, string item_name, uint256 price, string item_category, string item_description, string shipping_method, string shipping_fee_paid_by, uint8 state)",
        params: [BigInt(1739063608)],
    });

    useEffect(() => {
        if (Escrow) {
            // Create a structured object from the array
            const structuredData = {
                initiator: Escrow[0],
                transaction_title: Escrow[1],
                role: Escrow[2],
                currency: Escrow[3],
                inspection_period: Escrow[4].toString(), // Convert BigInt to string
                item_name: Escrow[5],
                price: Escrow[6].toString(), // Convert BigInt to string
                item_category: Escrow[7],
                item_description: Escrow[8],
                shipping_method: Escrow[9],
                shipping_fee_paid_by: Escrow[10],
                state: Escrow[11]
            };
            
            console.log('Escrow Data:', structuredData);
            console.log('Escrow Data (formatted):', 
                JSON.stringify(structuredData, null, 2)
            );
        }
    }, [Escrow]);

    if (isPending) return <div>Loading...</div>;
    if (!Escrow) return <div>No data found</div>;

    return <div>Data loaded - check console</div>;
}