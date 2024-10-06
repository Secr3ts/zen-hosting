import Image from 'next/image';

export default function NewsCard() {
    return (
        <section id="news">
            <div className="flex items-center justify-center min-h-screen bg-gray-600">
                <div className="flex flex-col md:flex-row gap-8 p-8">
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <Image
                            alt="Placeholder"
                            src="https://placehold.co/400x400.png"
                            width={400}
                            height={400}
                            className='invert rounded-md'
                        />
                        <p className='text-xl'>Zen Hosting, le choix des particuliers.</p>
                    </div>
                    <div className='flex-1 justify-between'>
                        <p className='text-4xl'>
                            <span>L&apos;hébérgement pour les particuliers</span>
                            <br />
                            <span className='font-semibold text-gray-900'>à moindre coûts</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}