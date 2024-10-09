"use client";

import { XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase-client-config";
import Image from "next/image";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import Link from 'next/link';

interface LoginFormProps {
    className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
    const router = useRouter();

    // later refactor to useForm ??
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getRedirectResult(auth).then(async (userCred) => {
            if (!userCred) {
                return;
            }

            fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                },
            }).then((response) => {
                if (response.status === 200) {
                    router.replace("/protected");
                }
            });
        });
    }, [router]);

    const signInWithEmail = async (data: any) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data ? data : {}),
            });

            if (res.ok) {
                const result = await res.json();
                // console.log(result);
                setError(""); // Clear the error state on successful login
                //router.replace("/protected");
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

    function signInWithGoogle() {
        signInWithRedirect(auth, provider);
    }

    function handleButtonClick() {
        signInWithEmail({
            email: email,
            password: password
        });
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
                        <Legend className="text-2xl">Connexion</Legend>
                        <div className={clsx(open ? "opacity-animation after:" : "opacity-0", "transition-all duration-300 flex flex-row bg-gray-300 rounded-sm")}>
                            <div className='group h-auto w-6 flex items-center justify-center bg-black rounded-l-sm'>
                                <XMarkIcon className='w-4 h-4 cursor-pointer text-white' onClick={() => setOpen(false)} color='white' />
                            </div>
                            <p className='px-2'>
                                <span className='font-medium'>Erreur</span> : <span className='font-normal text-gray-700'>{error}</span>
                            </p>
                        </div>
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
                        <div className='flex flex-row-reverse'>
                            <Button
                                type='submit'
                                onClick={handleButtonClick}
                                className={clsx("flex mt-2 items-center gap-2 rounded-lg bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white")}>
                                Se Connecter
                            </Button>
                        </div>
                    </Fieldset>

                </div>
                <Link href='/register' className='select-none cursor-pointer'>
                    <p className='underline'>
                        Vous ne possédez pas de compte ?
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

export default LoginForm;