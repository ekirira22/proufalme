'use client';

import { useEffect, useState } from "react";
import { Song, Album } from "@/types";
import { Header, ListItem, AlbumList } from "@/components";
import PageContent from "@/app/(site)/components/PageContent";
import getSongsByUserId from "@/actions/getSongsByUserId";
import getAlbumsByUserId from "@/actions/getAlbumsByUserId";

export default function HomeClient() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const songs = await getSongsByUserId();
      const albums = await getAlbumsByUserId();
      setSongs(songs);
      setAlbums(albums);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-white">Loading content...</div>;

  return (
    <div className="bg-neutral-900 rounded-md h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.png" name="Liked Songs" href="LikedSongs" />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-3 sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Newest songs</h1>
        </div>
        <PageContent songs={songs} />
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
