import { create } from "zustand";

export enum RepeatMode {
    OFF = 'OFF',
    ALL = 'ALL',
    ONE = 'ONE'
}

interface PlayerStore {
  ids: string[];
  originalIds: string[];
  activeId?: string;
  volume: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  preloadAudio: (id: string) => void;
  reset: () => void;
}

const audio = typeof window !== "undefined" ? new Audio() : null;

const usePlayer = create<PlayerStore>((set, get) => ({
  ids: [],
  activeId: undefined,
  volume: 1,
  isShuffled: false,
  repeatMode: RepeatMode.OFF,
  originalIds: [],

  setId: (id: string) => {
    if (!audio) return;

    const src = `${location.origin}/songs/${id}.mp3`;
    if (audio.src !== src) {
      audio.pause();
      audio.src = src;
      audio.preload = "auto";
      audio.load();
    }

    set({ activeId: id });
  },

  setIds: (ids: string[]) =>
    set({
      ids,
      originalIds: [...ids]
    }),

  setVolume: (volume: number) => {
    if (!audio) return;
    audio.volume = volume;
    set({ volume });
  },

  toggleShuffle: () => {
    const { ids, originalIds, isShuffled } = get();
    
    if (isShuffled) {
        // Restore original order
        set({ 
            isShuffled: false,
            ids: [...originalIds]
        });
    } else {
        // Shuffle the ids
        const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
        set({ 
            isShuffled: true,
            ids: shuffledIds
        });
    }
  },

  setRepeatMode: (mode: RepeatMode) => set({ repeatMode: mode }),

  play: () => {
    const { activeId, volume } = get();
    if (!audio || !activeId) return;
  
    const src = `${location.origin}/songs/${activeId}.mp3`;
  
    const shouldReload = audio.src !== src;
  
    if (shouldReload) {
      audio.pause();
      audio.src = src;
      audio.preload = "auto";
      audio.load();
    }
  
    audio.volume = volume;
  
    const playAudio = () => {
      audio
        .play()
        .catch((err) => {
          console.error("Failed to play:", err);
        });
    };
  
    // If the audio is ready, play immediately
    if (!shouldReload && audio.readyState >= 3) {
      playAudio();
    } else {
      // Wait until the audio is buffered enough
      audio.oncanplaythrough = () => {
        playAudio();
        audio.oncanplaythrough = null; // Clean up the event
      };
    }
  },  

  pause: () => {
    if (!audio) return;
    audio.pause();
  },

  next: () => {
    const { ids, activeId, repeatMode } = get();
    if (!activeId || !ids.length) return;

    const currentIndex = ids.indexOf(activeId);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= ids.length) {
      if (repeatMode === RepeatMode.ALL) {
        nextIndex = 0;
      } else {
        return; // stop at end
      }
    }

    const nextId = ids[nextIndex];
    get().setId(nextId);
    get().play();
  },

  previous: () => {
    const { ids, activeId } = get();
    if (!activeId || !ids.length) return;

    const currentIndex = ids.indexOf(activeId);
    const prevIndex = currentIndex - 1;

    if (prevIndex < 0) return;

    const prevId = ids[prevIndex];
    get().setId(prevId);
    get().play();
  },

  preloadAudio: (id: string) => {
    if (typeof window === "undefined") return;

    const temp = new Audio(`${location.origin}/songs/${id}.mp3`);
    temp.preload = "auto";
    temp.load();
  },

  reset: () => {
    if (audio) {
      audio.pause();
      audio.src = "";
    }

    set({
      ids: [],
      originalIds: [],
      activeId: undefined,
      isShuffled: false,
      repeatMode: RepeatMode.OFF,
    });
  }
}));

export default usePlayer;