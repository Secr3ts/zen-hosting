"use client"
import Footer from "../components/Footer";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
    const router = useRouter()
    
    const handleButtonClick = () => {
        router.push('/')
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen gap-2">
                <p className="text-2xl"><span className="font-semibold">404</span> - Non trouvé...</p>
                
                <Button 
                    className="rounded bg-gray-600 py-2 px-8 text-sm text-white data-[hover]:bg-gray-500 data-[active]:bg-gray-400 "
                    onClick={handleButtonClick}
                >
                    Retour
                </Button>
            </div>
            <footer className="fixed bottom-0">
                <Footer />
            </footer>
        </>
    )
}