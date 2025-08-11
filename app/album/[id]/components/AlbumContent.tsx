"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsMusicNoteBeamed } from "react-icons/bs";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";

interface AlbumContentProps {
    songs: Song[];
}

const AlbumContent: React.FC<AlbumContentProps> = ({ songs }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-3 sm:px-6 text-neutral-400">
                No songs in this album.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-3 sm:p-6">
            {/* Table Header */}
            <div className="grid grid-cols-[16px,4fr,2fr] gap-2 sm:gap-4 px-2 sm:px-4 py-2 text-neutral-400 text-xs sm:text-sm">
                <div>#</div>
                <div>Title</div>
                <div className="hidden sm:block">Artist</div>
            </div>
            
            {/* Songs List */}
            {songs.map((song, index) => (
                <div 
                    key={song.id} 
                    className="
                        group
                        grid
                        grid-cols-[16px,4fr,2fr]
                        gap-2
                        sm:gap-4
                        px-2
                        sm:px-4
                        py-2
                        hover:bg-neutral-800/50
                        rounded-md
                        cursor-pointer
                    "
                    onClick={() => onPlay(song.id)}
                >
                    <div className="flex items-center text-neutral-400">
                        <span className="group-hover:hidden text-xs sm:text-sm">{index + 1}</span>
                        <BsMusicNoteBeamed className="hidden group-hover:block w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex items-center">
                        <MediaItem data={song} onClick={() => onPlay(song.id)} />
                    </div>
                    <div className="hidden sm:flex items-center text-neutral-400 text-xs sm:text-sm">
                        {song.author}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlbumContent; 