'use client'
import InsertEscrow from "@/app/api/contract-interactions/InsertEscrow";
import CurrencyDropdown from "@/app/components/dashboard/transactions/CurrencyDropdown";
import ItemCategoryDropdown from "@/app/components/dashboard/transactions/ItemCategory";
import RoleDropdown from "@/app/components/dashboard/transactions/RoleDropdown";
import ShippingFeePaidBy from "@/app/components/dashboard/transactions/ShippingFeePaidBy";
import ShippingMethodDropdown from "@/app/components/dashboard/transactions/ShippingMethodDropdown";
import { useState } from "react";


export default function CreateEscrow() {
    // Add state for form values
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

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle dropdown changes
    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <form className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md">

            <h1 className=" text-center sm:text-justify text-3xl font-bold text-gray-900 my-10 border-b-4 pb-4">Create Escrow</h1>


            <div className="border-b border-gray-900/10 pb-12">

                <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-3 sm:col-span-6">
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
                        </div>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                            My Role
                        </label>
                        <RoleDropdown
                            value={formData.role}
                            onChange={(value) => handleDropdownChange('role', value)}
                        />
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">
                            Currency
                        </label>
                        <CurrencyDropdown
                            value={formData.currency}
                            onChange={(value) => handleDropdownChange('currency', value)}
                        />
                    </div>

                    <div className="col-span-3 sm:col-span-2">
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
                        </div>
                    </div>

                    <h2 className="col-span-3 sm:col-span-full text-xl font-semibold text-gray-900 border-b-2 pb-4">Escrow Details</h2>


                    <div className="col-span-3">
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
                        </div>
                    </div>
                    <div className="col-span-3">
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
                        </div>
                    </div>

                    <div className="col-span-3 sm:col-start-1">
                        <label htmlFor="itemCategory" className="block text-sm/6 font-medium text-gray-900">
                            Item Category
                        </label>
                        < ItemCategoryDropdown
                            value={formData.itemCategory}
                            onChange={(value) => handleDropdownChange('itemCategory', value)}
                        />
                    </div>

                    <div className="col-span-3">
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
                                className=" border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="col-span-3 sm:col-start-1">
                        <label htmlFor="shippingMethod" className="block text-sm/6 font-medium text-gray-900">
                            Shipping Method
                        </label>
                        < ShippingMethodDropdown
                            value={formData.shippingMethod}
                            onChange={(value) => handleDropdownChange('shippingMethod', value)}
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="shipFeePaidBy" className="block text-sm/6 font-medium text-gray-900">
                            Shipping fee paid by
                        </label>
                        < ShippingFeePaidBy
                            value={formData.shippingFeePaidBy}
                            onChange={(value) => handleDropdownChange('shippingFeePaidBy', value)}
                        />
                    </div>
                    <div className="col-span-3 sm:col-span-full flex justify-end">
                        <InsertEscrow
                            title={formData.escrowTitle}
                            role={formData.role}
                            currency={formData.currency}
                            inspectionPeriod={formData.inspectionPeriod}
                            itemName={formData.itemName}
                            price={formData.price}
                            itemCategory={formData.itemCategory}
                            itemDescription={formData.itemDescription}
                            shippingMethod={formData.shippingMethod}
                            shippingFeePaidBy={formData.shippingFeePaidBy}
                        />
                    </div>

                </div>
            </div>
        </form>
    );
}
