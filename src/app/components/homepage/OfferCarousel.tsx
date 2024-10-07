"use client"
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from "@headlessui/react";
import { useState } from "react";


// Offers descriptions to be refactorized into a database ? 
const offers = [{
    description: "Zen",
    prix: 110,
    features: ["Hébérgement", "Sécurité", "Démarches prises en charge", <a key={0} className="group" href="#footer">Pour en savoir plus, <span className="group-hover:underline">contactez nous</span> !</a>],
    color: "blue"
},
{
    description: "Full",
    prix: 150,
    features: ["Hébérgement", "Sécurité", "Serveur Mail", "Démarches prises en charge", <a key={1} className="group" href="#footer">Pour en savoir plus, <span className="group-hover:underline">contactez nous</span> !</a>],
    color: "red"
},
{
    description: "Lite",
    prix: 100,
    features: ["Hébérgement", "Sécurité", <a key={2} className="group" href="#footer">Pour en savoir plus, <span className="group-hover:underline">contactez nous</span> !</a>],
    color: "light-blue"
}
];

interface OfferCarouselProps {
    className?: string;
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({className}) => {
    // Index selected
    const [index, setIndex] = useState(0);

    return (
        // Add fake carousel mobile
        <section id="offers" className={className}>
            <div className="bg-gray-300 p-8 min-h-screen items-center justify-center flex flex-col gap-8">
                <p className="text-4xl text-black text-center">Nos Formules</p>
                <div className="flex flex-col md:flex-row gap-16 justify-center">
                    <Carousel className="rounded-md hidden md:flex overflow-hidden" showThumbs={false} onChange={(index) => setIndex(index)}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index}>
                                <Image
                                    priority
                                    src={"https://placehold.co/200x300.png"}
                                    alt={`Carousel item ${index + 1}`}
                                    width={200}
                                    height={300}
                                    className={index % 2 == 0 ? "invert" : ""}
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className="flex flex-col">
                        <div>
                            <p className="text-2xl font-bold text-black">{offers[index].description}</p>
                            <p className="text-black">
                                <span className="text-xl font-thin">{offers[index].prix}</span>€
                                <span className="font-thin text-sm">/ Mois
                                    <span className="text-red-600">
                                        *
                                    </span>
                                </span>
                            </p>
                        </div>
                        <div className="mt-4">
                            <Button className="hover:scale-110 ease-in duration-75 rounded bg-black py-2 px-4 text-sm text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-900">
                                Acheter
                            </Button>
                        </div>
                    </div>
                    <div className="flex-row">
                        <p className="text-2xl font-bold self-start text-black">Fonctionnalités</p>
                        <ul className="list-inside list-disc text-black">
                            {
                                offers[index].features.map((value, ind) => {
                                    return <li key={ind} className={"text-lg " + (offers[index].features.length - 1 === ind ? "list-none mt-4" : "")}>{value}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OfferCarousel;