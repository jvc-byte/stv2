'use client';
import { useCallback, useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { createEscrowTransaction } from "../../api/dashboard/create-escrow/CreateEscrow";
import CurrencyDropdown from "@/app/components/dashboard/transactions/CurrencyDropdown";
import ItemCategoryDropdown from "@/app/components/dashboard/transactions/ItemCategory";
import RoleDropdown from "@/app/components/dashboard/transactions/RoleDropdown";
import ShippingFeePaidBy from "@/app/components/dashboard/transactions/ShippingFeePaidBy";
import ShippingMethodDropdown from "@/app/components/dashboard/transactions/ShippingMethodDropdown";

export default function CreateEscrow() {
    const account = useActiveAccount();
    const [formData, setFormData] = useState({
        escrowTitle: '',
        role: '',
        currency: '',
        inspectionPeriod: 0,
        itemName: '',
        price: 0,
        itemCategory: '',
        itemDescription: '',
        shippingMethod: '',
        shippingFeePaidBy: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutate: sendTransaction, isPending } = useSendTransaction();
    const router = useRouter();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    }, []);

    const handleDropdownChange = useCallback((name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    }, []);

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.escrowTitle.trim()) newErrors.escrowTitle = 'Escrow Title is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (!formData.currency) newErrors.currency = 'Currency is required';
        if (formData.inspectionPeriod <= 0 || isNaN(formData.inspectionPeriod)) newErrors.inspectionPeriod = 'Inspection period must be a valid number greater than 0';
        if (!formData.itemName.trim()) newErrors.itemName = 'Item Name is required';
        if (formData.price <= 0 || isNaN(formData.price)) newErrors.price = 'Price must be a valid number greater than 0';
        if (!formData.itemCategory) newErrors.itemCategory = 'Item Category is required';
        if (!formData.itemDescription.trim()) newErrors.itemDescription = 'Item Description is required';
        if (!formData.shippingMethod) newErrors.shippingMethod = 'Shipping Method is required';
        if (!formData.shippingFeePaidBy) newErrors.shippingFeePaidBy = 'Shipping Fee Paid By is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (validateForm()) {
                try {
                    const transaction = await createEscrowTransaction(formData);

                    sendTransaction(transaction, {
                        onSuccess: async (receipt) => {
                            console.log("Transaction successful! Receipt:", receipt);
                            alert('Escrow created successfully!');

                            // Construct query parameters
                            const queryParams = new URLSearchParams({
                                escrowTitle: formData.escrowTitle,
                                role: formData.role,
                                currency: formData.currency,
                                inspectionPeriod: formData.inspectionPeriod.toString(),
                                itemName: formData.itemName,
                                price: formData.price.toString(),
                                itemCategory: formData.itemCategory,
                                itemDescription: formData.itemDescription,
                                shippingMethod: formData.shippingMethod,
                                shippingFeePaidBy: formData.shippingFeePaidBy,
                                transactionHash: receipt.transactionHash,
                                blockExplorerUrl: `https://base-sepolia.blockscout.com//tx/${receipt.transactionHash}`,
                                chainId: receipt.chain?.id?.toString() || 'N/A',
                                chainName: receipt.chain?.name?.toString() || 'N/A',
                                transactionStatus: 'Success',
                                blockNumber: '23417765',
                                timestamp: new Date().toLocaleString(),
                                method: 'createEscrow',
                                initiatorAddress: (account?.address)?.toString() || 'Unknown',
                                clientId: receipt.client.clientId.toString(),
                                subTotal: formData.price.toString(),
                                escrowFeePaidBy: formData.role,
                                // buyerPrice: formData.price.toString(),
                                // sellerProceeds: (formData.price * 0.95).toString(), // Example calculation
                            }).toString();

                            // Inside the onSuccess callback of sendTransaction
                            const saveTransactionDetails = async () => {
                                try {
                                    // Create the transaction details object
                                    const transactionDetails = {
                                        transaction_hash: receipt.transactionHash,
                                        item_name: formData.itemName,
                                        item_price: formData.price.toString(),
                                        escrow_title: formData.escrowTitle,
                                        initiator_role: formData.role,
                                        currency: formData.currency,
                                        inspection_period: formData.inspectionPeriod.toString(),
                                        shipping_method: formData.shippingMethod,
                                        shipping_fee_paid_by: formData.shippingFeePaidBy,
                                        item_category: formData.itemCategory,
                                        item_description: formData.itemDescription,
                                        block_explorer_url: `https://base-sepolia.blockscout.com/tx/${receipt.transactionHash}`,
                                        chain_id: receipt.chain?.id?.toString() || 'N/A',
                                        chain_name: receipt.chain?.name?.toString() || 'N/A',
                                        transaction_status: 'Success',
                                        block_number: '23417765', // You should get this from receipt
                                        timestamp: new Date().toISOString(),
                                        method: 'createEscrow',
                                        initiator_address: (account?.address)?.toString() || 'Unknown',
                                        client_id: receipt.client.clientId.toString()
                                    };

                                    // Get user email (you'll need to add this to your form or get it from user context)
                                    const email = 'user@example.com'; // Replace with actual user email

                                    // Send data to your API endpoint
                                    const response = await fetch('/api/dashboard/create-escrow', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email, transactionDetails })
                                    });

                                    if (!response.ok) {
                                        throw new Error('Failed to save transaction details');
                                    }

                                    const data = await response.json();
                                    console.log('Transaction details saved:', data);
                                } catch (error) {
                                    console.error('Error saving transaction details:', error);
                                    // Don't alert here - the transaction was successful, just the saving failed
                                }
                            };

                            // Call the function
                            await saveTransactionDetails();

                            // Redirect to transaction-details page with query parameters
                            router.push(`/dashboard/transaction-details?${queryParams}`);
                        },
                        onError: (error: unknown) => {
                            console.error("Transaction failed:", error);
                            alert(error instanceof Error ? `Failed to create escrow: ${error.message}` : 'Failed to create escrow: An unknown error occurred.');
                        },
                    });
                } catch (error: unknown) {
                    console.error('Error creating escrow:', error);
                    alert(error instanceof Error ? `Failed to create escrow: ${error.message}` : 'Failed to create escrow: An unknown error occurred.');
                }
            } else {
                console.log('Form has errors, please fix them.');
            }
        },
        [formData, sendTransaction, validateForm, router]
    );

    return (
        <form onSubmit={handleSubmit} className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md">
            <h1 className="text-center sm:text-justify text-3xl font-bold text-gray-900 my-10 border-b-4 pb-4">Create Escrow</h1>

            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Escrow Title */}
                    <div className="col-span-3 sm:col-span-6 will-change-transform">
                        <label htmlFor="escrowTitle" className="block text-sm/6 font-medium text-gray-900">
                            Escrow Title
                        </label>
                        <div className="">
                            <input
                                id="escrowTitle"
                                name="escrowTitle"
                                type="text"
                                autoComplete="Escrow Title"
                                value={formData.escrowTitle}
                                onChange={handleInputChange}
                                placeholder="Enter Escrow Title..."
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 sm:text-sm/6"
                            />
                            {errors.escrowTitle && <p className="text-red-500 text-sm mt-1">{errors.escrowTitle}</p>}
                        </div>
                    </div>

                    {/* Role Dropdown */}
                    <div className="col-span-3 sm:col-span-2 will-change-transform inset-0 z-20">
                        <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                            My Role
                        </label>
                        <RoleDropdown
                            id="role"
                            value={formData.role}
                            onChange={(value) => handleDropdownChange('role', value)}
                        />
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>

                    {/* Currency Dropdown */}
                    <div className="col-span-3 sm:col-span-2 will-change-transform inset-0 z-10">
                        <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">
                            Currency
                        </label>
                        <CurrencyDropdown
                            id="currency"
                            value={formData.currency}
                            onChange={(value) => handleDropdownChange('currency', value)}
                        />
                        {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
                    </div>

                    {/* Inspection Period */}
                    <div className="col-span-3 sm:col-span-2 will-change-transform">
                        <label htmlFor="inspectionPeriod" className="block text-sm/6 font-medium text-gray-900">
                            Inspection period (days)
                        </label>
                        <div className="relative w-full">
                            <input
                                id="inspectionPeriod"
                                name="inspectionPeriod"
                                type="number"
                                value={formData.inspectionPeriod}
                                onChange={handleInputChange}
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 sm:text-sm/6"
                                placeholder="Enter Number of Days..."
                            />
                            {errors.inspectionPeriod && <p className="text-red-500 text-sm mt-1">{errors.inspectionPeriod}</p>}
                        </div>
                    </div>

                    <h2 className="col-span-3 sm:col-span-full text-xl font-semibold text-gray-900 border-b-2 pb-4">Escrow Details</h2>

                    {/* Item Name */}
                    <div className="col-span-3 will-change-transform">
                        <label htmlFor="itemName" className="block text-sm/6 font-medium text-gray-900">
                            Item Name
                        </label>
                        <div className="">
                            <input
                                id="itemName"
                                name="itemName"
                                type="text"
                                value={formData.itemName}
                                onChange={handleInputChange}
                                autoComplete="Item Name"
                                placeholder="Enter Item Name..."
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                            {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-3 will-change-transform">
                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                            Price
                        </label>
                        <div className="">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                autoComplete="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter Item Price..."
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>
                    </div>

                    {/* Item Category Dropdown */}
                    <div className="col-span-3 sm:col-start-1 will-change-transform inset-0 z-[40]">
                        <label htmlFor="itemCategory" className="block text-sm/6 font-medium text-gray-900">
                            Item Category
                        </label>
                        <ItemCategoryDropdown
                            value={formData.itemCategory}
                            onChange={(value) => handleDropdownChange('itemCategory', value)}
                        />
                        {errors.itemCategory && <p className="text-red-500 text-sm mt-1">{errors.itemCategory}</p>}
                    </div>

                    {/* Item Description */}
                    <div className="col-span-3 will-change-transform">
                        <label htmlFor="itemDescription" className="block text-sm/6 font-medium text-gray-900">
                            Item Description
                        </label>
                        <div className="">
                            <input
                                id="itemDescription"
                                name="itemDescription"
                                type="text"
                                value={formData.itemDescription}
                                onChange={handleInputChange}
                                autoComplete="itemDescription"
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                            {errors.itemDescription && <p className="text-red-500 text-sm mt-1">{errors.itemDescription}</p>}
                        </div>
                    </div>

                    {/* Shipping Method Dropdown */}
                    <div className="col-span-3 sm:col-start-1 will-change-transform inset-0 z-20">
                        <label htmlFor="shippingMethod" className="block text-sm/6 font-medium text-gray-900">
                            Shipping Method
                        </label>
                        <ShippingMethodDropdown
                            value={formData.shippingMethod}
                            onChange={(value) => handleDropdownChange('shippingMethod', value)}
                        />
                        {errors.shippingMethod && <p className="text-red-500 text-sm mt-1">{errors.shippingMethod}</p>}
                    </div>

                    {/* Shipping Fee Paid By Dropdown */}
                    <div className="col-span-3 will-change-transform inset-0 z-10">
                        <label htmlFor="shipFeePaidBy" className="block text-sm/6 font-medium text-gray-900">
                            Shipping fee paid by
                        </label>
                        <ShippingFeePaidBy
                            value={formData.shippingFeePaidBy}
                            onChange={(value) => handleDropdownChange('shippingFeePaidBy', value)}
                        />
                        {errors.shippingFeePaidBy && <p className="text-red-500 text-sm mt-1">{errors.shippingFeePaidBy}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-3 sm:col-span-full flex justify-end will-change-transform">
                        <button
                            type="submit"
                            className="btn hover:btn-success btn-wide hover:text-white text-white bg-green-500 text-base font-medium"
                            disabled={isPending}
                        >
                            {isPending ? "Creating Escrow..." : "Create Escrow"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}