import { ChevronUpIcon } from "@heroicons/react/16/solid"

export default function TopButton() {
    return(
        <>
            {/** Menu déroulant ?? */}
            <a className="fixed bottom-4 right-4 shadow-2xl bg-blue-950 rounded-full hover:bg-blue-800" href="#news">
                <ChevronUpIcon color="white" height={32} width={32}/>
            </a>
        </>
    )
}