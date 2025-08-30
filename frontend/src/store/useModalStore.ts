import { create } from 'zustand';
import type { Room } from '../types/Room';

type ModalState = {
  isCreateRoomOpen: boolean;
  openCreateRoom: () => void;
  closeCreateRoom: () => void;

  // Invite modal state
  isInviteModalOpen: boolean;
  selectedRoom?: Room | null;
  openInviteModal: (room: Room) => void;
  closeInviteModal: () => void;

  isEditRoomOpen: boolean;
  openEditRoom: ()=>void;
  closeEditRoom: ()=>void;

  isEditDocOpen: boolean;
  openEditDoc: ()=>void;
  closeEditDoc: ()=>void;

  isCollabModalOpen: boolean;
  openCollabModal: ()=>void;
  closeCollabModal: ()=>void;
};

export const useModalStore = create<ModalState>((set) => ({
  isCreateRoomOpen: false,
  openCreateRoom: () => set({ isCreateRoomOpen: true }),
  closeCreateRoom: () => set({ isCreateRoomOpen: false }),

  isInviteModalOpen: false,
  openInviteModal: (room) => set({ isInviteModalOpen: true, selectedRoom: room }),
  closeInviteModal: () => set({ isInviteModalOpen: false, selectedRoom: null }),

  isEditRoomOpen: false,
  openEditRoom: () => set({ isEditRoomOpen: true }),
  closeEditRoom: () => set({ isEditRoomOpen: false }),

  isEditDocOpen: false,
  openEditDoc: () => set({ isEditDocOpen: true }),
  closeEditDoc: () => set({ isEditDocOpen: false }),

  isCollabModalOpen: false,
  openCollabModal: ()=>set({ isCollabModalOpen: true }),
  closeCollabModal: ()=>set({ isCollabModalOpen: false }),
}));


