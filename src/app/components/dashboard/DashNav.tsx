'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SignInButton from '../SignInButton'
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

const navigation = [
  { name: 'My Transactions', href: '#', current: true },
  { name: 'My Integrations', href: '#', current: false },
  { name: 'Get Verified', href: '#', current: false },
  { name: 'Help', href: '#', current: false },
  { name: 'Contact Us', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashNav() {
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Disclosure as="nav" className="bg-teal-600 mt-1 rounded-md">
        {({ open, close }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Logo - Now placed before the mobile menu button */}
                <div className="flex items-center">
                  <div className="flex shrink-0 items-center">
                    <Link href='/dashboard'>
                      <Image
                        alt="SealedTrust"
                        src="/logo.png"
                        width={32}
                        height={32}
                        className="w-10 h-10"
                      />
                    </Link>
                  </div>
                  {/* Mobile menu button - moved after logo */}
                  <div className="sm:hidden ml-2">
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                      <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                    </DisclosureButton>
                  </div>
                </div>

                <div className="flex flex-1 items-stretch justify-start">
                  {/* Navigation links */}
                  <div className="hidden sm:ml-20 sm:block sm:flex">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'border-b-2 border-white text-white' : 'text-gray-200 border-b-2 border-transparent hover:border-white hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <Link href={'/dashboard/create-escrow'} className="hidden lg:block ml-4 py-2 px-6 text-sm rounded-md bg-gradient-to-br from-violet-600 to-teal-400 text-white align-center cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr">Start a Transaction</Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-green-800 p-1 text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile Pop Up */}
                  <div className="relative ml-3">
                    <SignInButton />
                  </div>
                </div>
              </div>
            </div>

            {/* Add click outside detection for mobile menu */}
            {open && (
              <div 
                className="fixed inset-0 z-10" 
                aria-hidden="true"
                onClick={() => close()}
              />
            )}

            <DisclosurePanel 
              ref={navRef} 
              className="sm:hidden relative z-20"
            >
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'border-b-2 border-white text-white' : 'text-gray-200 border-b-2 border-transparent hover:border-white hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}

                <Link
                  href={"/dashboard/create-escrow"}
                  className={classNames(
                    'block rounded-md px-3 py-2 text-base text-center font-medium',
                    'text-white hover:bg-green-700',
                    'bg-gradient-to-br from-violet-600 to-teal-400',
                  )}
                >
                  Start a Transaction
                </Link>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}