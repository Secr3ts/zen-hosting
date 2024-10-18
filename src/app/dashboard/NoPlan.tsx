"use client";

import { useRouter } from "next/navigation";
import { UserInterface } from "@/lib/interfaces";
import { Button } from "@headlessui/react";
import clsx from 'clsx';

interface NoPlanProps {
    className?: string,
    userDetail?: UserInterface
}

const NoPlan: React.FC<NoPlanProps> = ({className, userDetail}) => {
    const router = useRouter();

    function handleButtonClick() {
        router.push('/boutique');
    }

    return(
        <div className={clsx(className, "mt-16")}>
            <p className="text-black text-2xl">Vous n'avez pas encore souscrit à nos <span className="font-semibold text-gray-800">services</span> !</p>
            <Button onClick={handleButtonClick} className={clsx("mt-2 px-4 py-2 rounded-md bg-black hover:text-gray-100 text-white hover:bg-gray-800 hover:scale-110")}>
                <p>Choisir une offre</p>
            </Button>
        </div>
    )
}

export default NoPlan;