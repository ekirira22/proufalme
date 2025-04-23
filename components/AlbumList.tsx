"use client"

import { Album } from "@/types";
import AlbumItem from "./AlbumItem";

interface AlbumListProps {
    albums: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
    if (albums.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No albums available.
            </div>
        );
    }

    return (
        <div className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
        ">
            {albums.map(album => (
                <AlbumItem key={album.id} data={album} />
            ))}
        </div>
    );
};

export default AlbumList; 