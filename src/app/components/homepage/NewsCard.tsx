import Image from 'next/image';

export default function NewsCard() {
    return (
        <div className="flex md:flex-row sm:flex-col gap-8 p-8">
            <div className="flex flex-col gap-8 items-center justify-center sm:items-start">
                <Image
                    alt="Placeholder"
                    src="https://placehold.co/400x400.png"
                    width={400}
                    height={400}
                    className='invert'
                />
                <p className='text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className='flex-1 justify-between'>
                <p className='text-2xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae minus laboriosam necessitatibus voluptas quam voluptates tempora culpa officia facilis, obcaecati doloribus laborum id, ut deleniti in sint magnam mollitia voluptate.</p>
                <div className="w-full h-px bg-black my-4"></div>
            </div>
        </div>
    )
}