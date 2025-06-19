import { Song } from "@/types"

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {                    
            return authModal.onOpen();      
        }
    
        const ids = songs.map((song) => song.id);
        player.setIds(ids);
        player.setId(id);
    
        // Preload next few songs (optional)
        const currentIndex = ids.indexOf(id);
        const nextSongs = ids.slice(currentIndex + 1, currentIndex + 4);
        nextSongs.forEach((songId) => player.preloadAudio(songId));
    
        player.play();
      };

    return onPlay;
}

export default useOnPlay;