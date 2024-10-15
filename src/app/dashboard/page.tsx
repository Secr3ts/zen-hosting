"use client"

import AppBar from '@/components/AppBar';
import clsx from 'clsx';
import Link from 'next/link';
import { EnvelopeIcon, GlobeAltIcon, WrenchScrewdriverIcon } from '@heroicons/react/16/solid';
import useSWR from 'swr';
import DashboardOverview from './DashboardOverview';
import Image from 'next/image';

interface DashboardProps {
    className?: string
}

const navigation = [
    { name: "Mes Sites", href: "#", current: false, icon: <GlobeAltIcon color="black" className='h-6 w-6 mx-2' /> },
    { name: "Mes Emails", href: "#", current: false, icon: <EnvelopeIcon color="black" className='h-6 w-6 mx-2' /> },
    { name: "Mes Paramètres", href: "#", current: false, icon: <WrenchScrewdriverIcon color="black" className='h-6 w-6 mx-2' /> },
]

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
    const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(res => res.json());

    const { data, isLoading } = useSWR('/api/userInfo', fetcher);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='z-10 shadow-xl'>
                <AppBar />
            </div>
            <section className={clsx(className)} id="dashboard">
                <div className='flex flex-row'>
                    <aside className='flex flex-col bg-gray-100 border-r border-gray-400'>
                        <div className='flex flex-row border-b border-gray-400 my-2'>
                            {(!isLoading && data.picture) && <Image height={16} width={16} className='' alt="Profile picture" src={data.picture}/>}
                            <p className='my-4 px-4 break-words min-w-64 min-h-4 text-black'>{!isLoading && data.email}</p>
                        </div>
                        <ul className='min-h-screen flex flex-col gap-2 rounded-r-lg'>
                            {
                                navigation.map((value, index) => {
                                    return (
                                        <li key={index}>
                                            {value.name === "Mes Paramètres" && <div className='mx-2 h-px bg-gray-400 my-2'></div>}
                                            <div className='flex flex-row items-center'>
                                                {value.icon}
                                                <Link href={value.href} className='text-gray-600'>
                                                    {value.name}
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </aside>
                    <div className='flex flex-col p-8'>
                        <DashboardOverview />
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Dashboard;