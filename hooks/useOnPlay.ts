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
        // Only preload the next song to reduce memory usage
        const nextSong = ids[currentIndex + 1];
        if (nextSong) {
            player.preloadAudio(nextSong);
        }
    
        player.play();
      };

    return onPlay;
}

export default useOnPlay;