"use client"
import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import PlayButton from "./PlayButton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {

    const imagePath = useLoadImage(data);

    return (
        <div 
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-2
                sm:p-3
            "
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-cover" 
                    src={imagePath || '/images/liked.png'} 
                    fill 
                    alt="Image" 
                />
            </div>

            <div className="flex flex-col items-start w-full pt-2 sm:pt-4 gap-y-1">
                <p className="font-semibold truncate w-full text-xs sm:text-sm md:text-base"> { data.title } </p>
                <p className="text-neutral-400 text-xs pb-2 sm:pb-4 w-full truncate"> By { data.author } </p>
            </div>

            {/* //Our Button  */}
            <div className="absolute bottom-16 sm:bottom-24 right-2 sm:right-5">
                <PlayButton />
            </div>
        </div>
  )
}

export default SongItem