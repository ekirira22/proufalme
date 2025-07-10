import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useSidebarToggle = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
