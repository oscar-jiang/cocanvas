import { create } from 'zustand';

type ModalState = {
  isCreateRoomOpen: boolean;
  openCreateRoom: () => void;
  closeCreateRoom: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isCreateRoomOpen: false,
  openCreateRoom: () => set({ isCreateRoomOpen: true }),
  closeCreateRoom: () => set({ isCreateRoomOpen: false }),
}));