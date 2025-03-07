'use client'
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import StyledDropdown from "./StyledDropdown";
import Image from "next/image";
import SignInButton from "./SignInButton";


export default function Header() {
    return (
        <div className="bg-gray flex flex-col sm:flex-row mt-6">
            <div className="w-full sm:w-1/2 mx-2">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-[58px] leading-none text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-teal-400">
                        Never buy or sell anything online without SealedTrust.
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        With SealedTrust you can buy and sell anything safely without the risk of loss. Truly Decentralized payments.
                    </p>

                    <div className="flex flex-col mt-4">
                        {/* Dropdowns */}
                        <div className="flex w-full">
                            {/* First Dropdown */}
                            <div className="relative w-full flex">
                                <select id="role" name="role" className="w-full appearance-none border border-gray-300 rounded-l-md px-4 py-2 pr-10 focus:outline-none">
                                    <option value="Brokering">I&#39;m Brokering</option>
                                    <option value="Buying">I&#39;m Buying</option>
                                    <option value="Selling">I&#39;m Selling</option>
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
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
                                        placeholder="For How many"
                                    />
                                    {/* Fourth Dropdown */}
                                    <div className="relative">
                                        <select id="currency" name="currency" className="h-full appearance-none border border-l-0 border-gray-300 rounded-r-md px-8 py-2 focus:outline-none bg-white">
                                            <option value="udc">USDC</option>
                                            <option value="usdt">USDT</option>
                                            <option value="eth">ETH</option>
                                            <option value="stngn">STNGN</option>
                                            <option value="brk">BRK</option>
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

                <div className="">
                <span className="bg-teal-700 btn w-full mt-2 hover:bg-teal-800 h-full"><SignInButton /></span>
                </div>
            </div>
            <div className="w-full sm:w-1/2 mx-2">
                <div className="card w-full relative h-[300px]">
                    <Image
                        fill
                        className="object-contain"
                        src="/escrow.png"
                        alt="How Escrow Works"
                    />
                </div>
            </div>
        </div>
    )
}