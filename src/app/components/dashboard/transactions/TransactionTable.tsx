'use client'
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import TransactionStatus from "./TransactionStatus";
import { useEffect, useState } from 'react';

interface Escrow {
    escrow_id: string;
    initiator: string;
    transaction_title: string;
    role: string;
    currency: string;
    inspection_period: string;
    item_name: string;
    price: string;
    item_category: string;
    item_description: string;
    shipping_method: string;
    shipping_fee_paid_by: string;
    escrow_status: string;
    created_on: string;
}

export default function TransactionTable() {
    const contract = getContract({ client, chain: baseSepolia, address: CREATE_ESCROW_CONTRACT_ADDRESS });
    const account = useActiveAccount();
    const [escrowsData, setEscrowsData] = useState<Escrow[]>([]);

    // Ensure wallet is connected
    if (!account) {
        return <div className="text-center font-bold">Please connect your wallet</div>;
    }

    const { data: escrows, isPending } = useReadContract({
        contract,
        method: "function getEscrowsByInitiator(address initiator) view returns ((uint256 escrow_id, address initiator, string transaction_title, string role, string currency, uint256 inspection_period, string item_name, uint256 price, string item_category, string item_description, string shipping_method, string shipping_fee_paid_by, uint8 Escrowstatus, uint256 created_on)[])",
        params: [account?.address],
    });

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
                escrow_status: escrow.Escrowstatus.toString(),  // Match the correct key name
                created_on: new Date(Number(escrow.created_on) * 1000).toLocaleString(),
            }));

            setEscrowsData(structuredEscrows);
        }
    }, [escrows]);

    if (isPending) return <div>Loading...</div>;
    if (!escrows || escrows.length === 0) return <div>No transactions found</div>;

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Transaction Title</th>
                        <th>Created On</th>
                        <th>Amount</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {escrowsData.map((escrow) => (
                        <tr key={escrow.escrow_id} className="hover">
                            <th>{escrow.escrow_id}</th>
                            <td>{escrow.transaction_title}</td>
                            <td>{escrow.created_on}</td>
                            <td>{escrow.price} {escrow.currency}</td>
                            <td>{escrow.role}</td>
                            <td><TransactionStatus status={escrow.escrow_status} /></td>
                            <td className="font-semibold text-center shadow-xs text-green-700 text-sm rounded-md py-1 px-1 cursor-pointer hover:bg-teal-600 hover:text-white">
                                Details
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
