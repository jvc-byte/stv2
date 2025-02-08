'use client'
import CurrencyDropdown from "@/app/components/dashboard/transactions/CurrencyDropdown";
import ItemCategoryDropdown from "@/app/components/dashboard/transactions/ItemCategory";
import RoleDropdown from "@/app/components/dashboard/transactions/RoleDropdown";
import ShippingFeePaidBy from "@/app/components/dashboard/transactions/ShippingFeePaidBy";
import ShippingMethodDropdown from "@/app/components/dashboard/transactions/ShippingMethodDropdown";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/16/solid";


export default function Dash() {
    return (
        <form className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md">

            <h1 className=" text-center sm:text-justify text-3xl font-bold text-gray-900 my-10 border-b-4 pb-4">Start Transactions</h1>


            <div className="border-b border-gray-900/10 pb-12">

                <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-3 sm:col-span-6">
                        <label htmlFor="transactionTitle" className="block text-sm/6 font-medium text-gray-900">
                            Transaction Title
                        </label>
                        <div className="">
                            <input
                                id="transactionTitle"
                                name="transactionTitle"
                                type="text"
                                autoComplete="Transaction Title"
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                            My Role
                        </label>
                        <RoleDropdown />
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">
                            Currency
                        </label>
                        <CurrencyDropdown />
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="inspectPeriod" className="block text-sm/6 font-medium text-gray-900">
                            Inspection period (days)
                        </label>
                        <div className="relative w-full">
                            <input
                                id="inspectPeriod"
                                name="inspectPeriod"
                                type="number"
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                                placeholder="Enter Number of Days..."
                            />
                        </div>
                    </div>

                    <h2 className="col-span-3 sm:col-span-full text-xl font-semibold text-gray-900 border-b-2 pb-4">Transactions Details</h2>


                    <div className="col-span-3">
                        <label htmlFor="itemName" className="block text-sm/6 font-medium text-gray-900">
                            Item Name
                        </label>
                        <div className="">
                            <input
                                id="itemName"
                                name="itemName"
                                type="text"
                                autoComplete="Item Name"
                                placeholder="Enter Item Name..."
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
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
                                placeholder="Enter Item Price..."
                                className="border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 sm:col-start-1">
                        <label htmlFor="itemCategory" className="block text-sm/6 font-medium text-gray-900">
                            Item Category
                        </label>
                        < ItemCategoryDropdown />
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
                                autoComplete="itemDescription"
                                className=" border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="col-span-3 sm:col-start-1">
                        <label htmlFor="shippingMethod" className="block text-sm/6 font-medium text-gray-900">
                            Shipping Method
                        </label>
                        < ShippingMethodDropdown />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="shipFeePaidBy" className="block text-sm/6 font-medium text-gray-900">
                            Shipping fee paid by
                        </label>
                        < ShippingFeePaidBy />
                    </div>
                    <div className="col-span-3 sm:col-span-full flex justify-end">
                        <button className="btn hover:btn-success btn-wide hover:text-white text-white bg-green-500 text-base font-medium">Update Item</button>
                    </div>

                </div>
            </div>
        </form>
    );
}
