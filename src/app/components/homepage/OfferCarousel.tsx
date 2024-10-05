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
    features: ["zen", "facile", "simple", "formule"],
    color: "blue"
},
{
    description: "Full",
    prix: 150,
    features: ["zen", "simple", "simple", "formule"],
    color: "red"
},
{
    description: "Lite",
    prix: 100,
    features: ["pas cher", "simple", "simple", "formule"],
    color: "light-blue"
}
];

export default function OfferCarousel() {
    // Index selected
    const [index, setIndex] = useState(0);

    return (
        <section id="offers">
            <div className="bg-gray-300 p-8 min-h-screen items-center justify-center flex flex-col gap-8">
                <p className="text-4xl text-black text-center">Nos Formules</p>
                <div className="flex flex-row gap-16 justify-center">
                    <Carousel className="rounded-md overflow-hidden" showThumbs={false} onChange={(index) => setIndex(index)}>
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
                            <Button className="rounded bg-black py-2 px-4 text-sm text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-900">
                                Acheter
                            </Button>
                        </div>
                    </div>
                    <div className="flex-row">
                        <p className="text-2xl font-bold self-start text-black">Fonctionnalités</p>
                        <ul className="list-inside list-disc text-black">
                            {
                                offers[index].features.map((value, index) => {
                                    return <li key={index} className="text-lg">{value}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}