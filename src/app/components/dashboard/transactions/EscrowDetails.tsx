"use client"
import { useState } from 'react';

const EscrowDetails = () => {
    const [countryCode, setCountryCode] = useState('US');
    const [email, setEmail] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleCheckboxChange = (e: any) => {
        setAgreeToTerms(e.target.checked);
    };


    return (

        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-5xl my-6 px-4 sm:px-6 lg:px-8 border rounded-md shadow-md pb-8">
            <div className="text-black flex flex-col">

                <div className="grid gap-x-2 gap-y-2 sm:grid-cols-6 mt-4">
                    <div className="flex justify-evenly col-span-6 border rounded-md shadow-md p-2">
                        <h1 className="text-center rounded-l-lg sm:text-justify text-2xl font-bold text-gray-700 my-2 col-span-6">Transaction Details</h1>
                    </div>
                </div>

                <div className="grid gap-x-2 gap-y-2 sm:grid-cols-6">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">Escrow Details</h1>
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Transaction ID:</td>
                                    <td className="p-2 w-1/4">#31641461</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Item Name:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Item Price:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Escrow Title:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Initaitor Role:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Currency:</td>
                                    <td className="p-2">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Inspection Period</td>
                                    <td className="p-2">value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Shipping Method:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Shipping Fee Paid By:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Item Category:</td>
                                    <td className="p-2">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Item Description:</td>
                                    <td className="p-2">value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid gap-x-2 gap-y-2 sm:grid-cols-6 mt-4">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">Transaction Receipt</h1>
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Transaction Hash:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Block Explorer URL:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Chain ID:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Chain Name:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Transaction Status:</td>
                                    <td className="p-2">success</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Block Number:</td>
                                    <td className="p-2">22855886</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-6 sm:col-span-3 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Timestamp:</td>
                                    <td className="p-2 w-1/4">Mar 09 2025 01:27:40 AM (+01:00 UTC)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Method:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Initiator Address:</td>
                                    <td className="p-2">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Client ID:</td>
                                    <td className="p-2">184b4b84b53c73f73c3abb20320f9a28</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid gap-x-2 gap-y-2 sm:grid-cols-6 mt-4">
                    <h1 className="text-center sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">Transaction Summary</h1>
                    <div className="col-span-6 border rounded-md shadow-md p-2">
                        <table className="">
                            <tbody>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Sub-Total:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold w-1/4">Escrow Fee Paid By:</td>
                                    <td className="p-2 w-1/4">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Buyer Price:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold">Seller Proceeds:</td>
                                    <td className="p-2 font-mono">value</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="text-center font-light italic text-gray-500 my-2 mt-4 col-span-6">All prices are in ETH. Taxes may apply.</h2>
                    </div>
                </div>

                <div className="grid gap-x-2 gap-y-2 sm:grid-cols-6 mt-4">
                    <h1 className="text-center rounded-l-lg sm:text-justify text-lg font-bold text-gray-700 my-2 mt-8 col-span-6">Seller Details</h1>
                    <div className="flex justify-evenly col-span-6 border rounded-md shadow-md p-2">
                        <div className="">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600"></label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="block w-full px-8 py-2 text-sm font-normal border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="flex">
                            <select
                                id="countries"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="w-20 text-gray-900 text-sm rounded-l-lg border border-gray-300 h-10 px-4 focus:ring-2 focus:ring-teal-200 focus:border-transparent"
                            >
                                <option value="US">IN</option>
                                <option value="CA">CA</option>
                                <option value="FR">Fr</option>
                            </select>
                            <input
                                type="text"
                                className="pl-4 border-l-0 rounded-l-0 text-sm h-10 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-r-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent"
                                placeholder="+91 000 000 0000"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex mt-4 justify-center">
                    <div className="flex items-center h-5">
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
                    <button className="bg-teal-500 text-white btn wide px-6 py-2 rounded-md hover:bg-teal-700">Start Transaction</button>
                </div>
            </div>
        </div>

    );
};

export default EscrowDetails;