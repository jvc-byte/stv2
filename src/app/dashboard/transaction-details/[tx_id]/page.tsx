'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {TransactionDetailsType} from '../../../api/types'

const TransactionDetails = () => {
    const params = useParams();
    const { tx_id } = params; // Get the transaction ID from the URL

    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (tx_id) {
            // Fetch transaction details based on the transaction ID
            fetch(`/api/dashboard/transaction-details/${tx_id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Transaction not found');
                    }
                    return response.json();
                })
                .then((data) => {
                    setTransactionDetails(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [tx_id]);

    if (loading) {
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
            <div className="text-black flex flex-col">
                <h1 className="text-center sm:text-justify text-2xl font-bold text-gray-700 my-2">
                    Transaction Details
                </h1>

                <div className="sm:grid-cols-6 mt-4">
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <p className="text-center text-gray-500">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    }

    if (error) {
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
            <div className="text-black flex flex-col">
                <h1 className="text-center sm:text-justify text-2xl font-bold text-gray-700 my-2">
                    Transaction Details
                </h1>

                <div className="sm:grid-cols-6 mt-4">
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <p className="text-center text-gray-500">Error: {error}</p>
                    </div>
                </div>
            </div>
        </div>
    }

    if (!transactionDetails) {
        return (
            <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
                <div className="text-black flex flex-col">
                    <h1 className="text-center sm:text-justify text-2xl font-bold text-gray-700 my-2">
                        Transaction Details
                    </h1>

                    <div className="sm:grid-cols-6 mt-4">
                        <div className="col-span-6 border rounded-md shadow-md p-2">
                            <p className="text-center text-gray-500">No transaction details found</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
            <div className="text-black flex flex-col">
                <h1 className="text-center sm:text-justify text-2xl font-bold text-gray-700 my-2">
                    Transaction Details
                </h1>

                <div className="sm:grid-cols-6 mt-4">
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.transaction_id}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Name:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_name}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_price}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Escrow Title:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.escrow_title}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Role:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.initiator_role}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Currency:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.currency}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Inspection Period:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.inspection_period}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.shipping_method}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Fee Paid By:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.shipping_fee_paid_by}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Category:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_category}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Description:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_description}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Hash:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.transaction_hash}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Block Explorer URL:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">
                                        <a href={transactionDetails.block_explorer_url} target="_blank" rel="noopener noreferrer">
                                            {transactionDetails.block_explorer_url}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Chain ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.chain_id}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Chain Name:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.chain_name}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Status:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.transaction_status}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Block Number:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.block_number}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Timestamp:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.timestamp}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.method}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Address:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.initiator_address}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Client ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.client_id}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;