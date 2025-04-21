'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TransactionDetailsType } from '../../../api/types'
import TruncateAndCopy from '@/app/components/TruncateAndCopy';

const TransactionDetails = () => {
    const router = useRouter();
    const params = useParams();
    const { tx_id } = params; // Get the transaction ID from the URL
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

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


    // Function to calculate escrow fee
    function escrowFee(subTotal: number) {
        const subTotalValue = parseFloat(subTotal.toString());
        const escrowFeeValue = subTotalValue * 0.01;
        return escrowFeeValue.toFixed(2);
    }

    const subTotal = transactionDetails?.item_price || 0.00;
    const escrowFeeValue = escrowFee(subTotal);
    const escrowFeePaidBy = transactionDetails?.shipping_fee_paid_by || 'Buyer';
    let buyerPrice = transactionDetails?.item_price || 0.00;
    let sellerProceeds = transactionDetails?.item_price || 0.00;

    // Deduct escrow fee from buyer or seller based on escrowFeePaidBy
    if (escrowFeePaidBy === 'Buyer') {
        buyerPrice = buyerPrice + parseFloat(escrowFeeValue);
    } else if (escrowFeePaidBy === 'Seller') {
        sellerProceeds = sellerProceeds - parseFloat(escrowFeeValue);
    }

    const handleTransactionResponse = async (response: 'approve' | 'decline' | 'modify') => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            let status;
            let message;

            switch (response) {
                case 'approve':
                    status = '2'; // Approved/Paid status
                    message = 'Transaction approved by seller';
                    break;
                case 'decline':
                    status = '11'; // Cancelled status
                    message = 'Transaction declined by seller';
                    break;
                case 'modify':
                    status = '16'; // Awaiting modification status
                    message = 'Seller requested modifications';
                    break;
                default:
                    throw new Error('Invalid response type');
            }

            const updateResponse = await fetch('/api/dashboard/transaction-details/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tx_id,
                    status,
                    message
                }),
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update transaction status');
            }

            // Redirect to progress page after successful update
            router.push(`/dashboard/transaction-progress?tx_id=${tx_id}`);
        } catch (error) {
            console.error('Error updating transaction:', error);
            setUpdateError(error instanceof Error ? error.message : 'Failed to update transaction');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return (
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
        );
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
                            <p className="text-center text-gray-500">Chill we&apos;ll get your transaction details soon</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
            <div className="text-black flex flex-col">

                {/* Transaction Details Header */}
                <div className="sm:grid-cols-6 mt-4">
                    <div className="flex justify-evenly col-span-6 border rounded-md shadow-md p-2">
                        <h1 className="text-center sm:text-justify text-2xl font-bold text-gray-700 my-2 col-span-6">
                            Transaction Details
                        </h1>
                    </div>
                </div>

                {/* Escrow Details Section */}
                <div className="sm:grid-cols-6">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">
                        Escrow Details
                    </h1>
                    <div className="col-span-6 border rounded-md shadow-md sm:p-2 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Name:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_name}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.item_price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Escrow Title:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.escrow_title}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Role:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.initiator_role}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Currency:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.currency}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Inspection Period:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.inspection_period}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.shipping_method}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Fee Paid By:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.shipping_fee_paid_by}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Category:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_category}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Description:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Transaction Summary Section */}
                <div className="sm:grid-cols-6 mt-4">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">
                        Transaction Summary
                    </h1>
                    <div className="col-span-6 border rounded-md shadow-md p-2 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.item_price}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Escrow Fee Paid By {transactionDetails.shipping_fee_paid_by}:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{escrowFeeValue}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Buyer Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{buyerPrice}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Seller Proceeds:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{sellerProceeds}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="text-center font-light italic text-gray-500 my-2 mt-4 col-span-6">
                            All prices are in {transactionDetails.currency}. Taxes may apply.
                        </h2>
                    </div>
                </div>

                {/* Transaction Receipt Section */}
                <div className="sm:grid-cols-6 mt-4">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">
                        Transaction Receipt
                    </h1>
                    <div className="col-span-6 border rounded-md shadow-md p-2 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Block Explorer Url:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <TruncateAndCopy hash={transactionDetails.block_explorer_url} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Hash:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <TruncateAndCopy hash={transactionDetails.transaction_hash} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Chain ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.chain_id}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Chain Name:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.chain_name}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Status:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.transaction_status}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Block Number:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.block_number}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Timestamp:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <TruncateAndCopy hash={transactionDetails.timestamp} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.method}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Address:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <TruncateAndCopy hash={transactionDetails.initiator_address} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Client ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <TruncateAndCopy hash={transactionDetails.client_id} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                    {updateError && (
                        <div className="text-red-500 text-center mb-4">
                            {updateError}
                        </div>
                    )}
                    <button 
                        onClick={() => handleTransactionResponse('decline')}
                        disabled={isUpdating}
                        className="bg-red-500 text-white btn wide px-6 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Processing...' : "I Don't Agree"}
                    </button>
                    <button
                        onClick={() => handleTransactionResponse('modify')}
                        disabled={isUpdating}
                        className="bg-yellow-500 text-white btn wide px-6 py-2 rounded-md hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Processing...' : 'Request Modifications'}
                    </button>
                    <button 
                        onClick={() => handleTransactionResponse('approve')}
                        disabled={isUpdating}
                        className="bg-teal-500 text-white btn wide px-6 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? 'Processing...' : 'I Agree'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;