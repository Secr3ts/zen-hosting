"use client"
import { DisclosureButton, Disclosure } from "@headlessui/react"
import { ChevronUpIcon, EllipsisHorizontalCircleIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

export default function TopButton() {

    return (
        <Disclosure>
            {/** Menu déroulant ?? */}
            <DisclosureButton className="group flex flex-col-reverse fixed bottom-4 right-4 shadow-2xl bg-blue-950 rounded-full hover:bg-black">
                <XMarkIcon className="hidden group-data-[open]:block" aria-hidden={true} color="white" height={32} width={32} />
                <EllipsisHorizontalCircleIcon className="block group-data-[open]:hidden" aria-hidden={true} color="white" height={32} width={32} />
                <a href="#"><ChevronUpIcon aria-hidden={true} className="hidden group-data-[open]:block" color="white" height={32} width={32} /></a>
                {/** Add interactive chat */}
            </DisclosureButton>
        </Disclosure>
    )
}