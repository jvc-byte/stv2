"use client";

import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon, ChartPieIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import SignInButton from "./SignInButton";
import Link from "next/link";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href?: string;
  items?: { name: string; href: string; description: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; }[];
}

const navigation: NavigationItem[] = [
  {
    name: "Consumer",
    items: [
      { name: "Learn More", href: "#learn-more", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "Benefits", href: "#benefits", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "Fees", href: "#fees", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
    ],
  },
  {
    name: "Business",
    items: [
      { name: "Learn More", href: "#business-learn-more", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "Become a Partner", href: "#partner", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
    ],
  },
  {
    name: "Developer",
    items: [
      { name: "API Integration", href: "#api-integration", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "API Documentation", href: "#api-docs", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
    ],
  },
  {
    name: "Help",
    items: [
      { name: "What is Escrow", href: "#what-is-escrow", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "Fees", href: "#help-fees", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
      { name: "Contact Us", href: "#contact", description: 'Get a better understanding of your traffic', icon: ChartPieIcon },
    ],
  },
];

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => { setOpenDropdown(openDropdown === name ? null : name); };

  return (
    <div className="border-b border-gray-200 bg-grey-100">
      <div>
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8 my-2"
        >
          <div className="flex items-center">
            <Link href="#" className="flex -m-1.5 p-1.5">
              <span className="sr-only">Sealed Trust</span>
              <Image
                alt="SealedTrust Logo"
                src="/logo.png"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl ml-2">SealedTrust</span>
            </Link>

            <div className="hidden lg:flex lg:ml-24">
              {navigation.map((item) => (
                <div key={item.name} className="relative group px-4">
                  <button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                    {item.name}
                    <ChevronDownIcon
                      className="h-4 w-4 mt-0.5 group-hover:text-green-600 group-hover:rotate-180 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="absolute left-0 z-50 mt-3 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="overflow-hidden rounded-xl bg-gray-50 shadow-lg ring-1 ring-gray-900/5">
                      <div className="p-4">
                        {item.items?.map((item) => (
                          <div key={item.name} className="group/item relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-200">
                            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover/item:bg-white">
                              <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover/item:text-green-600" />
                            </div>
                            <div>
                              <Link href={item.href} className="font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                              </Link>
                              <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-200"
                          >
                            <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center">
            <SignInButton />
          </div>
        </nav>
      </div>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={"#"} className="-m-1.5 p-1.5">
              <span className="sr-only">SealedTrust</span>
              <Image
                alt="SealedTrust Logo"
                src="/window.svg"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                    >
                      <span>{item.name}</span>
                      {openDropdown === item.name ? (
                        <ChevronUpIcon className="h-4 w-4 ml-1" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <SignInButton />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}