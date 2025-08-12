'use client';

import { useEffect, useState } from "react";
import { Song, Album } from "@/types";
import { Header, ListItem, AlbumList } from "@/components";
import PageContent from "@/app/(site)/components/PageContent";
import getAllSongs from "@/actions/getAllSongs";
import getAllAlbums from "@/actions/getAllAlbums";

export default function HomeClient() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { songs: initialSongs, hasMore: moreSongs } = await getAllSongs(1, 10);
      const initialAlbums = await getAllAlbums(1, 10);
      setSongs(initialSongs);
      setAlbums(initialAlbums);
      setHasMore(moreSongs);
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadMoreSongs = async () => {
    const nextPage = currentPage + 1;
    const { songs: newSongs, hasMore: moreSongs } = await getAllSongs(nextPage, 10);
    setSongs(prev => [...prev, ...newSongs]);
    setHasMore(moreSongs);
    setCurrentPage(nextPage);
  };

  if (loading) return <div className="p-6 text-white">Loading content...</div>;

  return (
    <div className="bg-neutral-900 rounded-md h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">Welcome to Proufalme</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.png" name="Liked Songs" href="LikedSongs" />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-3 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Newest songs</h1>
        </div>
        <PageContent songs={songs} onLoadMore={loadMoreSongs} hasMore={hasMore} />
      </div>

      <div className="mt-2 mb-7 px-3 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Latest Albums</h1>
        </div>
        <AlbumList albums={albums} />
      </div>
    </div>
  );
}
