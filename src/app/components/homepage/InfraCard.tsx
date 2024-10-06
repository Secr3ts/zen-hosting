import Image from "next/image";

export default function InfraCard() {
    return (
        <>
            <section id="infra">
                <div className="bg-gray-400 p-8 min-h-screen items-center justify-center flex flex-col gap-8">
                    <p className="text-4xl text-center">Notre <span className="font-semibold">Infrastructure</span></p>
                    <div className="flex flex-col md:flex-row gap-8">
                        {[...Array(3)].map((_, index) => {
                                return (
                                    // CLick to reveal ?
                                    <div className="flex md:flex-col text-center flex-row gap-8">
                                        <Image
                                            src="https://placehold.co/200x200.png"
                                            width={200}
                                            height={200}
                                            alt="infr"
                                            className="rounded-md"
                                        />
                                        <p className="text-xl">Infra 1 </p>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>
        </>
    )
}