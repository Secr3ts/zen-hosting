"use client"
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from "@headlessui/react";
import { useState } from "react";

const offers = [{
    description: "desc1",
    prix: 90,
    features: ["zen", "facile", "simple", "formule"]
},
{
    description: "desc2",
    prix: 30,
    features: ["zen", "simple", "simple", "formule"]
},
{
    description: "desc3",
    prix: 20,
    features: ["pas cher", "simple", "simple", "formule"]
}
];

export default function OfferCarousel() {
    const [index, setIndex] = useState(0)

    return (
        <div className="bg-gray-400 p-8">
            <div className="flex flex-row gap-16 justify-center">
                <Carousel showThumbs={false} onChange={(index) => setIndex(index)}>
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
                        <p>{offers[index].description}</p>
                        <p>{offers[index].prix} €</p>
                    </div>
                    <div className="">
                        <Button className="rounded bg-black py-2 px-4 text-sm text-white data-[hover]:bg-gray-950 data-[active]:bg-gray-900">
                            Acheter
                        </Button>
                    </div>
                </div>
                <div className="flex-row">
                    <ul className="list-disc">
                        {
                            offers[index].features.map((value, index) => {
                                return <li key={index}>{value}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}