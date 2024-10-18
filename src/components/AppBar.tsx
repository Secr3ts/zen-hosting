"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon, UserIcon } from "@heroicons/react/16/solid";
import Image from 'next/image'
import Link from "next/link";
import { useState } from "react";
import clsx from 'clsx';
import useSWR, { mutate } from "swr";
import { NavigationInterface } from "@/lib/interfaces";


interface AppBarProps {
    className?: string;
    navigation?: NavigationInterface[];
}

const AppBar: React.FC<AppBarProps> = ({className, navigation})  => {
    const [isUser, setUser] = useState(false);

    const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(res => res.json());
    // mauvaise logique ? revoir
    const { data, isLoading } = useSWR('/api/login', fetcher);

    async function handleSignOut() {
        try {
            const response = await fetch('/api/signOut', { method: 'POST' });
            if (response.ok) {
                mutate('/api/login');
                setUser(false);
            };
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={className}>
            <Disclosure as="nav" className="bg-gray-950 rounded-b-md">
                <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
                    <div className={clsx("relative flex h-16 items-center justify-between")}>
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justifiy-center rounded-md p-2 text-gray-300 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                            <div className="group flex-row hidden md:flex">
                                <Image
                                    src="/logo.png"
                                    width={400}
                                    height={400}
                                    alt="zen-hosting"
                                    className="h-8 w-auto"
                                />
                                {/*<p className="hidden group-hover:block text-white">Zen Hosting</p>*/}
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {
                                        navigation && navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={clsx(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-50 hover:text-black',
                                                    'rounded-md px-3 py-2 text-sm font-medium')}
                                            >{item.name}</a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button // hidden don't forget
                                type="button"
                                className="hidden relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">test</span>
                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="hover:scale-110 ease-in duration-75 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <UserIcon className={clsx("h-8 w-8 rounded-full", isUser ? "" : "")} color="white" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            Tableau de Bord
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href="#" className="hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            Paramètres
                                        </a>
                                    </MenuItem>
                                    {
                                        (!isLoading && data.isLogged) && <MenuItem>
                                            <a onClick={handleSignOut} className={clsx("block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:text-red-500 hover:cursor-pointer")}>
                                                Se Déconnecter
                                            </a>
                                        </MenuItem>
                                    }
                                    {
                                        (isLoading || !data.isLogged) && <MenuItem>
                                            <Link href='/login' className={clsx("block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 hover:text-green-300")}>
                                                Se Connecter
                                            </Link>
                                        </MenuItem>
                                    }
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {
                            navigation && navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={clsx(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white hover:text-black',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))
                        }
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

export default AppBar;