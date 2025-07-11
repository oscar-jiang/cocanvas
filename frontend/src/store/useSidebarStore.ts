import { create } from 'zustand';

type SidebarState = {
  isMinimized: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isMinimized: false,
  toggleSidebar: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));