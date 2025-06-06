'use client'

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import MediaItem from "./MediaItem"
import useOnPlay from "@/hooks/useOnPlay"

interface LibraryProps {
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();

    const { user } = useUser();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        // Check if a user exists. 
        if (!user) {
            return authModal.onOpen();
        }

        //TODO: Check for subscription

        return uploadModal.onOpen();

        // Handle Upload Later
        //It will open an upload modal that will be used to upload songs
    }
    return (
        <div className="flex flex-col">
            {/* Library Header  */}
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus 
                    className="text-neutral-400 cursor-pointer hover:text-white transition" 
                    onClick={onClick}
                    size={20}
                />
            </div>
            {/* Library Songs  */}
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem 
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library