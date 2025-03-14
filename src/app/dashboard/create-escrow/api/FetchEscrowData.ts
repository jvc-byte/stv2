import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { useEffect, useState } from 'react';
import { Escrow } from "../interfaces";

export const FetchEscrowsData = () => {
    const contract = getContract({ client, chain: baseSepolia, address: CREATE_ESCROW_CONTRACT_ADDRESS });
    const account = useActiveAccount();

    const { data: escrows, isPending } = useReadContract({
        contract,
        method: "function getEscrowsByInitiator(address initiator) view returns ((uint256 escrow_id, address initiator, string transaction_title, string role, string currency, uint256 inspection_period, string item_name, uint256 price, string item_category, string item_description, string shipping_method, string shipping_fee_paid_by, uint8 Escrowstatus, uint256 created_on)[])",
        params: () => Promise.resolve([account?.address ?? ""] as const)
    });

    const [escrowsData, setEscrowsData] = useState<Escrow[]>([]);

    useEffect(() => {
        if (escrows && escrows.length > 0) {
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
                escrow_status: escrow.Escrowstatus.toString(),
                created_on: new Date(Number(escrow.created_on) * 1000).toLocaleString(),
            }));

            setEscrowsData(structuredEscrows);
        }
    }, [escrows]);

    return { escrows, escrowsData, isPending, account };
};