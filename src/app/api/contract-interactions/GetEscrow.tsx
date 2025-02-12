'use client'
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains"
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { useEffect } from 'react';

export default function GetEscrow() {
    const contract = getContract({ client: client, chain: baseSepolia, address: CREATE_ESCROW_CONTRACT_ADDRESS })
    const account = useActiveAccount()

    // Check if account is defined
    if (!account) {
        return <div>Please connect your wallet</div>;
    }

    const { data: escrows, isPending } = useReadContract({
        contract,
        method:
           "function getEscrowsByInitiator(address initiator) view returns ((uint256 escrow_id, address initiator, string transaction_title, string role, string currency, uint256 inspection_period, string item_name, uint256 price, string item_category, string item_description, string shipping_method, string shipping_fee_paid_by, uint8 Escrowstatus, uint256 created_on)[])",
        params: [account?.address],
    });

    useEffect(() => {
        if (escrows && escrows.length > 0) {
            // Map each escrow entry to a structured object
            const structuredEscrows = escrows.map(escrow => ({
                escrow_id: escrow.escrow_id.toString(),
                initiator: escrow.initiator,
                transaction_title: escrow.transaction_title,
                role: escrow.role,
                currency: escrow.currency,
                inspection_period: escrow.inspection_period.toString(),
                item_name: escrow.item_name,
                price: escrow.price.toString(),
                item_category: escrow.item_category,
                item_description: escrow.item_description,
                shipping_method: escrow.shipping_method,
                shipping_fee_paid_by: escrow.shipping_fee_paid_by,
                escrow_status: escrow.Escrowstatus,
                created_on: escrow.created_on.toString(),
            }));

            console.log('All Escrows:', structuredEscrows);
            console.log('Formatted Escrows:',
                JSON.stringify(structuredEscrows, null, 2)
            );
        } else {
            console.log(`No escrows found for this initiator (${account?.address})`);
        }
    }, [escrows]);

    if (isPending) return <div>Loading...</div>;
    if (!escrows) return <div>No data found</div>;

    return <div>Data loaded - check console</div>;
}