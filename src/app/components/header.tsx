'use client'
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import StyledDropdown from "./styled-dropdown";


export default function Header() {
    return (
        <div className="bg-gray flex flex-col sm:flex-row mt-6">
            <div className="w-full sm:w-1/2 mx-2">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-[58px] leading-none text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-teal-400">
                        No 1. Decentralized Buy and Sell Platform
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        With SealedTrust you can buy and sell anything safely without the risk of loss. Truly Decentralized payments.
                    </p>

                    <div className="flex flex-col mt-4">
                        {/* Dropdowns */}
                        <div className="flex w-full">
                            {/* First Dropdown */}
                            <div className="relative w-full flex">
                                <select className="w-full appearance-none border border-gray-300 rounded-l-md px-4 py-2 pr-10 focus:outline-none">
                                    <option value="Brokering">I'm Brokering</option>
                                    <option value="Buying">I'm Buying</option>
                                    <option value="Selling">I'm Selling</option>
                                </select>
                                <ChevronDownIcon
                                    className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-900 pointer-events-none"
                                    aria-hidden="true"
                                />
                                {/* Second Dropdown */}
                                <StyledDropdown />
                            </div>
                        </div>

                        <div className="flex w-full mt-4">
                            <div className="relative w-full">
                                <div className="flex">
                                    {/* Third Dropdown */}
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
                                        placeholder="For How many"
                                    />
                                    {/* Fourth Dropdown */}
                                    <div className="relative">
                                        <select className="h-full appearance-none border border-l-0 border-gray-300 rounded-r-md px-8 py-2 focus:outline-none bg-white">
                                            <option value="domain">USDC</option>
                                            <option value="contracted">USDT</option>
                                        </select>
                                        <ChevronDownIcon
                                            className="absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-900 pointer-events-none"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="relative bg-green-200 overflow-hidden group btn w-full mt-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-violet-600 transition-transform duration-500 transform translate-x-[-100%] group-hover:translate-x-0"></span>
                    <span className="relative text-black group-hover:bg-transparent transition-colors duration-300">Get Started Now</span>
                </button>
            </div>
            <div className="w-full sm:w-1/2 mx-2">
                <div className="card w-full">
                    <figure>
                        <img
                            src="https://d1zm2628k0l6s5.cloudfront.net/wp-content/uploads/2023/03/escrow_with_eqi_.png"
                            alt="Shoes" />
                    </figure>
                </div>
            </div>
        </div>
    )
}