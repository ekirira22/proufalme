"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types"
import Image from "next/image";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const imageUrl = useLoadImage(data);
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
        //TODO: Default turn on player
    }

  return (
    <div
        onClick={handleClick}
        className="flex items-center gap-x-2 sm:gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-1 sm:p-2 rounded-md"
    >
        <div className="relative rounded-md min-h-[32px] min-w-[32px] sm:min-h-[40px] sm:min-w-[40px] md:min-h-[48px] md:min-w-[48px] overflow-hidden">
            <Image
            fill
            src={imageUrl || '/images/liked.png'}
            alt="Media Item"
            className="object-cover"
            />
        </div>

        <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate text-xs sm:text-sm md:text-base">
                {data?.title}
            </p>
            <p className="text-neutral-400 text-xs truncate">
                {data?.author}
            </p>
        </div>
    </div>
  )
}

export default MediaItem