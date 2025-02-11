'use client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SignInButton from '../SignInButton'
import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <div>
      <Disclosure as="nav" className="bg-teal-700 mt-1">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href='/dashboard'>
                  <Image
                    alt="SealedTrust"
                    src="/logo.png"
                    width={128} // h-8 is 32px 
                    height={64}
                    className="w-auto"
                  />
                </Link>
              </div>

              {/* Navigation links */}
              <div className="hidden sm:ml-20 sm:block sm:flex">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-green-900 text-white' : 'text-gray-200 hover:bg-green-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <Link href={'/dashboard/create-escrow'} className="hidden lg:block ml-4 py-2 px-6 text-sm rounded-md bg-gradient-to-br from-violet-600 to-teal-400 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr">Start a Transaction</Link>
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

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-green-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt="User Icon"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      width={32} // Equivalent to size-8 (8 * 4px = 32px)
                      height={32}
                      className="rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <div
                      className="block px-4 py-2"
                    >
                      <SignInButton />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={"/user-profile"}
                      className="block hover:bg-teal-600 hover:text-white px-4 py-2 text-sm text-green-700 data-focus:bg-green-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={"#"}
                      className="block hover:bg-teal-600 hover:text-white px-4 py-2 text-sm text-green-700 data-focus:bg-green-100 data-focus:outline-hidden"
                    >
                      Settings
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-green-900 text-white' : 'text-white hover:bg-green-700',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}

            <Link
              href={"/dashboard/create-escrow"}
              className={classNames(
                'block rounded-md px-3 py-2 text-base text-center font-medium', // Match navigation item styling
                'text-white hover:bg-green-700', // Match hover and text color
                'bg-gradient-to-br from-violet-600 to-teal-400', // Add gradient background
              )}
            >
              Start a Transaction
            </Link>
          </div>


        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
