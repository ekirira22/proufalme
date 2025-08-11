"use client"

import { Song } from "@/types"
import { SongItem, SongSkeleton } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ songs, onLoadMore, hasMore, loading }) => {
  const onPlay = useOnPlay(songs);

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
          <SongSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (songs.length === 0){
    return (
      <div className="mt-4 text-neutral-400">
        No songs available.
      </div>
    )
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
       {
        songs.map ( song => (
          <SongItem 
            key={song.id} 
            onClick={(id:string) => onPlay(id)} 
            data={song} 
          />
        ))
       }
      </div>
      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={onLoadMore}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            Load More Songs
          </button>
        </div>
      )}
    </div>
  )
  
}

export default PageContent