'use client'
import { FetchEscrowsData } from '../../../dashboard/create-escrow/api/FetchEscrowData';
import TransactionStatus from "./TransactionStatus";

export default function TransactionTable() {
    const { escrowsData, isPending, account } = FetchEscrowsData();

    // Render loading state
    if (isPending) {
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
                        <tr><th></th></tr>
                    </tbody>
                </table>
                <div className="text-center font-bold text-gray-500">Loading...</div>
            </div>
        );
    }

    // Render wallet connection state
    if (!account) {
        return <div className="text-center font-bold text-gray-500">Please connect your wallet</div>;
    }

    // Render empty state
    if (!escrowsData || escrowsData.length === 0) {
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
                        <tr><th></th></tr>
                    </tbody>
                </table>
                <div className="text-center font-bold text-gray-500">No transactions found</div>
            </div>
        );
    }

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
                            <td>{escrow.escrow_id}</td>
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