"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActiveAccount, useProfiles, } from 'thirdweb/react';
import { client } from '@/lib/client';

const EscrowDetails = () => {
    const account = useActiveAccount();
    const [email, setEmail] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const { data: profiles } = useProfiles({
        client,
    });

    const searchParams = useSearchParams();

    // Function to calculate escrow fee
    function escrowFee(subTotal: number) {
        const subTotalValue = parseFloat(subTotal.toString());
        const escrowFeeValue = subTotalValue * 0.01;
        return escrowFeeValue.toFixed(2);
    }

    // Retrieve and calculate values before constructing transactionDetails
    const subTotal = parseFloat(searchParams.get('subTotal') || '0');
    const escrowFeeValue = escrowFee(subTotal);
    const escrowFeePaidBy = searchParams.get('escrowFeePaidBy') || 'Buyer';
    let buyerPrice = parseFloat(searchParams.get('subTotal') || '0');
    let sellerProceeds = parseFloat(searchParams.get('subTotal') || '0');

    // Deduct escrow fee from buyer or seller based on escrowFeePaidBy
    if (escrowFeePaidBy === 'Buyer') {
        buyerPrice = buyerPrice + parseFloat(escrowFeeValue);
    } else if (escrowFeePaidBy === 'Seller') {
        sellerProceeds = sellerProceeds - parseFloat(escrowFeeValue);
    }

    // Retrieve transaction details from query parameters
    const transactionDetails = {
        transactionId: searchParams.get('transactionId') || 'N/A',
        itemName: searchParams.get('itemName') || 'N/A',
        itemPrice: searchParams.get('price') || 'N/A',
        escrowTitle: searchParams.get('escrowTitle') || 'N/A',
        initiatorRole: searchParams.get('role') || 'N/A',
        currency: searchParams.get('currency') || 'N/A',
        inspectionPeriod: searchParams.get('inspectionPeriod') || 'N/A',
        shippingMethod: searchParams.get('shippingMethod') || 'N/A',
        shippingFeePaidBy: searchParams.get('shippingFeePaidBy') || 'N/A',
        itemCategory: searchParams.get('itemCategory') || 'N/A',
        itemDescription: searchParams.get('itemDescription') || 'N/A',
        transactionHash: searchParams.get('transactionHash') || 'N/A',
        blockExplorerUrl: searchParams.get('blockExplorerUrl') || 'N/A',
        viewDetailsUrl: searchParams.get('viewDetailsUrl' )|| 'N/A',
        chainId: searchParams.get('chainId') || 'N/A',
        chainName: searchParams.get('chainName') || 'N/A',
        transactionStatus: searchParams.get('transactionStatus') || 'N/A',
        blockNumber: searchParams.get('blockNumber') || 'N/A',
        timestamp: searchParams.get('timestamp') || 'N/A',
        method: searchParams.get('method') || 'N/A',
        initiatorAddress: (account?.address)?.toString() || 'N/A',
        clientId: searchParams.get('clientId') || 'N/A',
        subTotal: subTotal.toFixed(2),
        escrowFeePaidBy: escrowFeePaidBy,
        buyerPrice: buyerPrice.toFixed(2),
        sellerProceeds: sellerProceeds.toFixed(2),
        escrowFee: escrowFeeValue,
        receiverEmail: email || 'N/A',
        escrowInitiatorEmail: profiles?.[0]?.details?.email || 'a user',
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeToTerms(e.target.checked);
    };

    const handleSendEmail = async () => {
        if (!email || !agreeToTerms) {
            alert('Please provide a valid email address and agree to the terms.');
            return;
        }

        setIsSendingEmail(true);

        try {
            const apiUrl = process.env.EMAIL_END_POINT_URL || "../../api/email/sendEmail/";

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email, transactionDetails }),
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            if (data.success) {
            setEmailSent(true);
                alert('Transaction details sent successfully.');
                // Navigate to transaction progress page
                window.location.href = `/dashboard/transaction-progress?tx_id=${transactionDetails.transactionHash}`;
            } else {
                alert(`Failed to send email: ${data.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert(`An error occurred: ${error || 'Unknown error'}`);
        } finally {
            setIsSendingEmail(false);
        }
    };

    const [copied, setCopied] = useState(false);

    // Function to copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        });
    };

    // Function to truncate text
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.slice(0, maxLength)}...`;
    };


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
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.itemName}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.itemPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Escrow Title:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.escrowTitle}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Role:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.initiatorRole}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Currency:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.currency}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Inspection Period:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.inspectionPeriod}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2 mt-4 sm:mt-0 sm:mb-1">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.shippingMethod}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Shipping Fee Paid By:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.shippingFeePaidBy}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Category:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.itemCategory}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Item Description:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.itemDescription}</td>
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
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Sub-Total:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.subTotal}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Escrow Fee Paid By {transactionDetails.escrowFeePaidBy}:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.escrowFee}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Buyer Price:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.buyerPrice}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Seller Proceeds:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.sellerProceeds}</td>
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
                                        <span className="pr-20 truncate">
                                            {truncateText(transactionDetails.blockExplorerUrl, 10)}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(transactionDetails.blockExplorerUrl)}
                                            className="ml-4 text-blue-500 hover:text-blue-700"
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Hash:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <span className="pr-20 truncate">
                                            {truncateText(transactionDetails.transactionHash, 10)}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(transactionDetails.transactionHash)}
                                            className="ml-4 text-blue-500 hover:text-blue-700"
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
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
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.chainId}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Chain Name:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.chainName}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Transaction Status:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.transactionStatus}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Block Number:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4">{transactionDetails.blockNumber}</td>
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
                                        <span className="pr-20 truncate">
                                            {truncateText(transactionDetails.timestamp, 10)}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(transactionDetails.timestamp)}
                                            className="ml-4 text-blue-500 hover:text-blue-700"
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Method:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 ">{transactionDetails.method}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Initiator Address:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 break-words">{transactionDetails.initiatorAddress}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/2 sm:w-1/4">Client ID:</td>
                                    <td className="p-2 w-1/2 sm:w-3/4 flex">
                                        <span className="pr-20 truncate">
                                            {truncateText(transactionDetails.clientId, 10)}
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(transactionDetails.clientId)}
                                            className="ml-4 text-blue-500 hover:text-blue-700"
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Seller Details Section */}
                <div className="sm:grid-cols-6 mt-4">
                    <h1 className="text-center rounded-l-lg sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">
                        Seller Details
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-evenly col-span-6 border rounded-md shadow-md p-2 gap-4">
                        <div className="w-full sm:w-1/2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600"></label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="block w-full px-4 py-2 text-sm font-normal border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex mt-4 justify-center text-center">
                    <div className="flex items-center align-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                            I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={handleSendEmail}
                        disabled={isSendingEmail || emailSent}
                        className="bg-teal-500 text-white btn wide px-6 py-2 rounded-md hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSendingEmail ? 'Sending...' : emailSent ? 'Email Sent!' : 'Email Transaction Details To Seller'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default EscrowDetails;