'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href}) => {
    const router = useRouter()
    const onClick = () => {
        //Add authentication before push
        router.push(href)
    }
    return (
        <button onClick={onClick} className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-3
            sm:gap-x-4
            bg-neutral-100/20
            transition
            pr-3
            sm:pr-4

        ">
            <div className="
                relative
                min-h-[48px]
                min-w-[48px]
                sm:min-h-[64px]
                sm:min-w-[64px]
            ">
                <Image 
                    className="object-cover"
                    fill
                    src={ image }
                    alt="image"
                />
            </div>
            <p className="font-medium truncate py-3 sm:py-5 text-white text-sm sm:text-base">
                { name }
            </p>
            <div className="
                absolute
                transition
                opacity-0
                rounded-full
                flex
                items-center
                justify-center
                bg-orange-600
                p-2
                sm:p-4
                drop-shadow-md
                right-2
                sm:right-5
                group-hover:opacity-100
                hover:scale-110
            ">
                <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" /> 
            </div>
             
        </button>
    )
}

export default ListItem;
