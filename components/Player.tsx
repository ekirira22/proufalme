"use client"

import { useEffect } from "react";
import usePlayer from "@/hooks/usePlayer"
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

const Player = () => {

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId)
  
  const songUrl = useLoadSongUrl(song!);

  useEffect(() => {
    if (player.activeId) {
      player.preloadAudio(player.activeId);
    }
  }, [player.activeId]);

  // Optionally, only play after preload to minimize delay
  // useEffect(() => {
  //   if (player.activeId) {
  //     player.play();
  //   }
  // }, [player.activeId]);

  if (!song || !songUrl) return null;


  return (
    <div className="
      fixed
      bottom-0
      bg-[#121212]
      w-full
      py-2
      h-[80px]
      px-4
    ">
      <PlayerContent  
        key={songUrl}
        song={song!}
        songUrl={songUrl}
      />

    </div>
  )
}

export default Player