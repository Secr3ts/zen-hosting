"use client"

import { Input, Field, Label, Description, Button } from "@headlessui/react";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import { SetStateAction, useState } from "react";

const links = [
    {
        icon: <BookOpenIcon height={16} width={16} color="white" />,
        link: "#",
        description: "C.D.G"
    },
    {
        icon: <BookOpenIcon height={16} width={16} color="white" />,
        link: "#",
        description: "C.D.U"
    },
]

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleButtonClick = () => {
        if (!email) {
            // alert
            return;
        }

        setEmail('');
    };

    return (
        <section id="footer" className="rounded-t-md w-screen">
            <div className="flex flex-row bg-black justify-around p-8">
                {/* Logo */}
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-row">
                        <Image
                            src={"/logo.png"}
                            width={64}
                            height={64}
                            alt="logo"
                        />
                        <p className="ml-2 font-medium text-white text-2xl content-center">Zen <span className="text-gray-400">Hosting</span></p>
                    </div>
                    <p className="text-white">
                        <span>Service d&apos;hébérgement pour</span> <span className="text-gray-300">particuliers</span>
                        <br />
                        <span>Vous avez un projet ?</span> <span className="font-semibold">Nous le réalisons.</span>
                    </p>
                </div>
                {/** Links */}
                <div className="flex flex-1 flex-col text-white">
                    <p className="text-2xl">Liens Utiles</p>
                    {
                        links.map((link, index) => {
                            return (
                                <a className="flex flex-row" key={index} href={link.link}>
                                    <p className="text-white content-center">{link.description}</p>
                                </a>

                            )
                        })
                    }
                </div>
                {/** Contact form */}
                <Field className="flex flex-1 flex-col">
                    <Label className="text-white text-2xl">Contactez Nous !</Label>
                    <Description className="text-white/50 text-xl/2">Entrez votre email</Description>
                    <Input
                        type="email" 
                        className="mt-3 w-1/2 rounded-lg border-none bg-white/4 py-1.5 px-3 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25" 
                        onChange={handleEmailChange}    
                    />
                    <Button 
                        className="flex mt-2 justify-center items-center gap-2 w-1/4 rounded-lg bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                        onClick={handleButtonClick}    
                    >
                        Recevoir
                    </Button>
                </Field>
            </div>
        </section>
    )
}