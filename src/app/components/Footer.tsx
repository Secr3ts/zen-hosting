import { Input } from "@headlessui/react";
import Image from "next/image";

export default function Footer() {
    return (
        <>
            <div className="flex flex-row bg-black justify-around p-8">
                {/* Logo */}
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row">
                        <Image
                            src={"/logo.png"}
                            width={64}
                            height={64}
                            alt="logo"
                        />
                        <p className="font-medium text-white">Zen Hosting</p>
                    </div>
                    <p className="text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae laboriosam tenetur rerum, et perspiciatis delectus sint fugiat ea alias, a dolorum aut placeat ullam aperiam, consequatur dolores inventore facilis amet.
                    </p>
                </div>
                {/** Links */}
                <div className="flex flex-1 flex-col text-white">
                    <p>Liens</p>
                    <p>Lien</p>
                    <p>Lien</p>
                    <p>Lien</p>
                </div>
                {/** Contact form */}
                <div className="flex flex-1 flex-col text-white">
                    <p>Contactez nous</p>
                    <Input type="text"/>
                </div>
            </div>
        </>
    )
}