import { create } from "zustand";

export enum RepeatMode {
    OFF = 'OFF',
    ALL = 'ALL',
    ONE = 'ONE'
}

interface PlayerStore {
    ids: string[];
    activeId?: string;
    volume: number;
    isShuffled: boolean;
    repeatMode: RepeatMode;
    originalIds: string[]; // Store original order for shuffle
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    setVolume: (volume: number) => void;
    toggleShuffle: () => void;
    setRepeatMode: (mode: RepeatMode) => void;
    reset: () => void;
};

const usePlayer = create<PlayerStore>((set, get) => ({
    ids: [],
    activeId: undefined,
    volume: 1,
    isShuffled: false,
    repeatMode: RepeatMode.OFF,
    originalIds: [],
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string[]) => set({ 
        ids: ids,
        originalIds: [...ids] // Store original order
    }),
    setVolume: (volume: number) => set({ volume }),
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
    reset: () => set({ 
        ids: [], 
        activeId: undefined,
        isShuffled: false,
        repeatMode: RepeatMode.OFF
    })
}));

export default usePlayer;