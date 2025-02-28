

'use client';
import { client } from "@/lib/client";
import { CREATE_ESCROW_CONTRACT_ADDRESS } from "@/lib/contracts";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import CurrencyDropdown from "@/app/components/dashboard/transactions/CurrencyDropdown";
import ItemCategoryDropdown from "@/app/components/dashboard/transactions/ItemCategory";
import RoleDropdown from "@/app/components/dashboard/transactions/RoleDropdown";
import ShippingFeePaidBy from "@/app/components/dashboard/transactions/ShippingFeePaidBy";
import ShippingMethodDropdown from "@/app/components/dashboard/transactions/ShippingMethodDropdown";
import { useCallback, useState } from "react";

export default function CreateEscrow() {
    // State for form values
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

    // State for validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Hook for sending transactions
    const { mutate: sendTransaction, isPending } = useSendTransaction();

    // Memoize the handlers to prevent unnecessary re-renders
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear the error for the field when the user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }, []);

    const handleDropdownChange = useCallback((name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear the error for the field when the user selects a value
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    }, []);

    // Validation function (memoized)
    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.escrowTitle.trim()) {
            newErrors.escrowTitle = 'Escrow Title is required';
        }
        if (!formData.role) {
            newErrors.role = 'Role is required';
        }
        if (!formData.currency) {
            newErrors.currency = 'Currency is required';
        }
        if (formData.inspectionPeriod <= 0 || isNaN(formData.inspectionPeriod)) {
            newErrors.inspectionPeriod = 'Inspection period must be a valid number greater than 0';
        }
        if (!formData.itemName.trim()) {
            newErrors.itemName = 'Item Name is required';
        }
        if (formData.price <= 0 || isNaN(formData.price)) {
            newErrors.price = 'Price must be a valid number greater than 0';
        }
        if (!formData.itemCategory) {
            newErrors.itemCategory = 'Item Category is required';
        }
        if (!formData.itemDescription.trim()) {
            newErrors.itemDescription = 'Item Description is required';
        }
        if (!formData.shippingMethod) {
            newErrors.shippingMethod = 'Shipping Method is required';
        }
        if (!formData.shippingFeePaidBy) {
            newErrors.shippingFeePaidBy = 'Shipping Fee Paid By is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }, [formData]); // Add formData as a dependency

    // Handle form submission
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault(); // Prevent default form submission

            if (validateForm()) {
                // Form data is valid, proceed with submission
                console.log('Form is valid, submitting...', formData);

                try {
                    // Get the contract instance
                    const contract = getContract({
                        client: client,
                        chain: baseSepolia,
                        address: CREATE_ESCROW_CONTRACT_ADDRESS,
                    });

                    // Prepare the contract call
                    const createEscrow = prepareContractCall({
                        contract,
                        method: "function createEscrow(string _title, string _role, string _currency, uint256 _inspection_period, string _item_name, uint256 _price, string _item_category, string _item_description, string _shipping_method, string _shipping_fee_paid_by) returns (uint256)",
                        params: [
                            formData.escrowTitle,
                            formData.role,
                            formData.currency,
                            BigInt(formData.inspectionPeriod),
                            formData.itemName,
                            BigInt(formData.price),
                            formData.itemCategory,
                            formData.itemDescription,
                            formData.shippingMethod,
                            formData.shippingFeePaidBy,
                        ],
                    });

                    // Send the transaction
                    await sendTransaction(createEscrow, {
                        onSuccess: (receipt) => {
                            console.log("Transaction successful! Receipt:", receipt);
                            alert('Escrow created successfully!');

                            // Reset the form after successful submission
                            setFormData({
                                escrowTitle: '',
                                role: '',
                                currency: '',
                                inspectionPeriod: 0,
                                itemName: '',
                                price: 0,
                                itemCategory: '',
                                itemDescription: '',
                                shippingMethod: '',
                                shippingFeePaidBy: '',
                            });
                        },
                        onError: (error: unknown) => {
                            console.error("Transaction failed:", error);
                            if (error instanceof Error) {
                                alert(`Failed to create escrow: ${error.message}`);
                            } else {
                                alert('Failed to create escrow: An unknown error occurred.');
                            }
                        },
                    });
                } catch (error: unknown) {
                    console.error('Error creating escrow:', error);
                    if (error instanceof Error) {
                        alert(`Failed to create escrow: ${error.message}`);
                    } else {
                        alert('Failed to create escrow: An unknown error occurred.');
                    }
                }
            } else {
                console.log('Form has errors, please fix them.');
            }
        },
        [formData, sendTransaction, validateForm] // Add validateForm to the dependency array
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