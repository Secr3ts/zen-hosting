import Marquee from "react-fast-marquee";

export default function NewsHeader() {
    return(
        <>
            <div className="mx-auto max-w-full min-w-full bg-black"
            >
                <Marquee>
                    <p className="text-center text-white m-50">zen hosting - ouverture très prochaine</p>
                </Marquee>
            </div>
        </>
    )
}