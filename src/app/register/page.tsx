"use client";

import { XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import { createUserWithEmailAndPassword, getRedirectResult, signInWithCredential, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase-client-config";
import Image from "next/image";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import Link from 'next/link';

interface RegisterFormProps {
    className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className }) => {
    const router = useRouter();

    // later refactor to useForm ??
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const registerWithEmail = async (data: any) => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data ? data : {}),
            });

            if (res.ok) {
                const result = await res.json();
                setError(""); // Clear the error state on successful login
                router.replace('/login/', {scroll: true})
            } else {
                const errorResponse = await res.json();
                setError(errorResponse.error); // Set the error state
                setOpen(true);
            }
        } catch (error) {
            setError("Une erreur est survenue."); // Set the error state
            setOpen(true);
        }
    };

    function handleButtonClick() {
        setOpen(false);
        setError("");

        const data = {
            email: email,
            password: password,
            name: name
        }

        if (!data.email || !data.password || !data.name) { return; }
        // ajouter popup pour les mots de passe non identique
        if (password === passwordConf) { registerWithEmail(data); } else { alert('Veuillez vérifier les mots de passe') }
        return;
    }

    return (
        <section id="login" className={clsx(className)}>
            <div className='flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-300'>
                <div className="flex flex-row">
                    <Image
                        src={"/logo.png"}
                        width={64}
                        height={64}
                        alt="logo"
                    />
                    <p className="ml-2 font-medium text-white text-2xl content-center">Zen <span className="text-gray-400">Hosting</span></p>
                </div>
                <div className="w-full max-w-lg px-4 bg-gray-400 rounded-lg">
                    <Fieldset className="space-y-6 rounded-xl p-6 sm:p-10">
                        <Legend className="text-2xl">Inscription</Legend>
                        <div className={clsx(open ? "opacity-animation after:" : "opacity-0", "transition-all duration-300 flex flex-row bg-gray-300 rounded-sm")}>
                            <div className='group h-auto w-6 flex items-center justify-center bg-black rounded-l-sm'>
                                <XMarkIcon className='w-4 h-4 cursor-pointer text-white' onClick={() => setOpen(false)} color='white' />
                            </div>
                            <p className='px-2'>
                                <span className='font-medium'>Erreur</span> : <span className='font-normal text-gray-700'>{error}</span>
                            </p>
                        </div>
                        <Field>
                            <Label>Prénom Nom<span className='text-red-600'>*</span></Label>
                            <Input type='text' required onChange={(event) => { setName(event.target.value) }} placeholder='Jean Dupont' className={clsx('mt-3 block w-full resize-none rounded-lg border-none bg-gray-200 focus:bg-white py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <Field>
                            <Label>E-Mail<span className='text-red-600'>*</span></Label>
                            <Input type='email' required onChange={(event) => { setEmail(event.target.value) }} placeholder='email@zen-hosting.systems' className={clsx('mt-3 block w-full resize-none rounded-lg border-none bg-gray-200 focus:bg-white py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <Field>
                            <Label>Mot de passe<span className='text-red-600'>*</span></Label>
                            <Input type='password' required onChange={(event) => { setPassword(event.target.value) }} placeholder='Entrez votre mot de passe' className={clsx('mt-3 block w-full resize-none rounded-lg border-none bg-gray-200 focus:bg-white py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <Field>
                            <Label>Confirmation du mot de passe<span className='text-red-600'>*</span></Label>
                            <Input type='password' required onChange={(event) => { setPasswordConf(event.target.value) }} placeholder='Entrez votre mot de passe' className={clsx('mt-3 block w-full resize-none rounded-lg border-none bg-gray-200 focus:bg-white py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <div className='flex flex-row-reverse'>
                            <Button
                                type='submit'
                                onClick={handleButtonClick}
                                className={clsx("flex mt-2 items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white")}>
                                S'inscrire
                            </Button>
                        </div>
                    </Fieldset>

                </div>
                <Link href="/login" className='select-none cursor-pointer'>
                    <p className='underline'>
                        Vous possédez déjà un compte ?
                    </p>
                </Link>
                {/* Revise Footer ?*/}
                <footer className='fixed bottom-0 hidden'>
                    <Footer />
                </footer>
            </div>
        </section>
    )
}

export default RegisterForm;