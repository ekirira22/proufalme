"use client"

import { Album } from "@/types";
import AlbumItem from "./AlbumItem";
import AlbumSkeleton from "./AlbumSkeleton";

interface AlbumListProps {
    albums: Album[];
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums, onLoadMore, hasMore, loading }) => {
    if (loading) {
        return (
            <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5
                xl:grid-cols-6
                2xl:grid-cols-8
                gap-2
                sm:gap-4
                mt-4
            ">
                {Array.from({ length: 6 }).map((_, index) => (
                    <AlbumSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (albums.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No albums available.
            </div>
        );
    }

    return (
        <div>
            <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5
                xl:grid-cols-6
                2xl:grid-cols-8
                gap-2
                sm:gap-4
                mt-4
            ">
                {albums.map(album => (
                    <AlbumItem key={album.id} data={album} />
                ))}
            </div>
            {hasMore && onLoadMore && (
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={onLoadMore}
                        className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                    >
                        Load More Albums
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlbumList;