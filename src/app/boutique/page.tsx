"use client";

import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import { SubscriptionPlanInterface } from '@/lib/interfaces';
import clsx from 'clsx';
import useSWR from 'swr';
import Image from 'next/image';
import { Button } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

interface BoutiqueProps {
    className?: string;
}


const Boutique: React.FC<BoutiqueProps> = ({className}) => {
    const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(res => res.json());

    const { data, isLoading, error } = useSWR('/api/plans/', fetcher);

    const [isOpen, setOpen ] = useState(false);

    function toggleOpen() {
        setOpen(!isOpen);
    }

    return (
        <>
            <div className={clsx(className)}>
                <AppBar className='fixed top-0 shadow-xl z-10 w-screen' />
                <div className='mt-10 bg-gray-400 h-screen flex sm:flex-row flex-col justify-center items-center gap-32'>
                    {
                        data && (data as SubscriptionPlanInterface[]).map((plan) => {
                            return (
                                <div className='flex flex-col text-white shadow-2xl'>
                                    <div className='bg-white p-2 rounded-sm'>
                                        <Image src="https://placehold.co/200x200.png" width={200} height={200} className='p-4' alt={plan.name} />
                                        <p className='text-black text-xl text-center'>
                                            <span>{plan.name}</span>
                                        </p>
                                    </div>
                                    <div className='flex flex-col bg-black/5 gap-1 p-2 text-center'>
                                        <p className='text-sm text-gray-300'>
                                            <span>à partir de</span>
                                            <br />
                                            <span className='text-3xl text-white'>{plan.price} €</span>
                                            <br />
                                            <span>TTC</span><span className='text-red-500 absolute'>*</span>
                                        </p>
                                        <Button onClick={toggleOpen} className="flex flex-row items-center justify-center border border-white rounded-sm p-2 hover:bg-transparent bg-gray-600 shadow-lg transition duration-75">
                                            <p>Voir plus de détail</p>
                                            <ChevronDownIcon className={clsx('h-6 w-6', isOpen ? 'hidden': 'block')}/>
                                            <ChevronUpIcon className={clsx('h-6 w-6', isOpen ? 'block' : 'hidden')}/>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Boutique;