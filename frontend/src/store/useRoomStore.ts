import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { RoomStore } from "../types/RoomStore.ts";
import { AxiosError } from "axios";
import axios from "axios";
import socket from "../lib/socket.ts";
import { useAuthStore } from "./useAuthStore.ts";
import { useDocumentStore } from "./useDocumentStore.ts";
import type { Room } from '../types/Room.ts';

export const useRoomStore = create<RoomStore>((set, get) => ({
  currentRoom: null,
  isCreatingRoom: false,

  createRoom: async (data) => {
    set({ isCreatingRoom: true });
    try {
      const response = await axiosInstance.post("/room/create", data);
      toast.success("Successfully created the room: " + response.data.roomName);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        if (error.response?.status === 403) {
          toast.error("Room limit reached (10 rooms max)");
        } else {
          toast.error("Something went wrong.");
          console.error("An error has occurred in createRoom", e);
        }
      } else {
        console.log("Error in createRoom: " + e);
        toast.error("Something went wrong.");
      }
    } finally {
      set({ isCreatingRoom: false });
    }
  },

  rooms: [],
  isRoomsLoading: false,
  getRooms: async (): Promise<void> => {
    set({ isRoomsLoading: true });
    try {
      const response = await axiosInstance.get("/room/user/my");
      // as we log out should rooms be turn back into an empty array
      set({ rooms: response.data });
    } catch (e) {
      toast.error("Something went wrong. " + e);
    } finally {
      set({ isRoomsLoading: false });
    }
  },

  isCheckingRoomAuth: true,
  checkRoomAuth: async (roomId: string) => {
    set({ isCheckingRoomAuth: true });
    try {
      const res = await axiosInstance.get(`/room/${roomId}`);
      set({ currentRoom: res.data });
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit("joinRoom", roomId);
      // console.log("Socket connected to room: ", roomId);
    } catch (e) {
      set({ currentRoom: null });
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
          toast.error("You are not authorized to access this room or this room does not exist.");
        } else {
          toast.error("Something went wrong.");
          console.error("An error has occurred in checkRoomAuth", e);
        }
      } else {
        toast.error("Something went wrong.");
        console.error("Non-Axios error in checkRoomAuth", e);
      }
    } finally {
      set({ isCheckingRoomAuth: false });
    }
  },
  leavePageReset: async () => {
    socket.emit("leaveRoom");
    // save document before leaving room
    await useDocumentStore.getState().handleOnSave();
    set({
      currentRoom: null,
      // PROBLEM: if we clear the rooms, the fetching goes out of sync and the dashboard page doesn't rerender with any recent rooms
      // : [],
      // recentRooms: [],
      isRoomsLoading: false,
      isCreatingRoom: false,
      isCheckingRoomAuth: true,
    });
    //reset current document
    useDocumentStore.setState({ currentDoc: null });

  },
  logoutReset: () => {
    if (socket.connected) socket.disconnect();
    set({
      currentRoom: null,
      rooms: [],
      recentRooms: [],
      isRoomsLoading: false,
      isCreatingRoom: false,
      isCheckingRoomAuth: true,
    });
  },

  isDeletingRoom: false,
  deleteRoom: async (id: string): Promise<void> => {
    set({ isDeletingRoom: true });
    const { recentRooms } = get();
    try {
      await axiosInstance.delete(`/room/${id}`);
      set({ recentRooms: recentRooms.filter(room => room.roomId !== id) });
      toast.success("Successfully deleted!");
    } catch (e) {
      toast.error("Something went wrong.");
      console.error("Error in deleteRoom", e);
    } finally {
      set({ isDeletingRoom: false });
    }
  },

  joinRoom: () => {
    const authUser = useAuthStore.getState().authUser;
    const socket = useAuthStore.getState().socket;
    const currentRoom = get().currentRoom;
    if (!authUser || !socket || !currentRoom) { return; }

    const roomId: string = currentRoom.roomId;
    const userId: string | undefined = authUser.userId;

    socket.emit("joinRoom", { roomId, userId });
  },
  leaveRoom: () => {
    const authUser = useAuthStore.getState().authUser;
    const socket = useAuthStore.getState().socket;
    const currentRoom = get().currentRoom;

    if (!authUser || !socket || !currentRoom) return;

    const roomId = currentRoom.roomId;
    const userId = authUser.userId;

    socket.emit("leaveRoom", { roomId, userId });
  },

  recentRooms: [],
  isRecentRoomsLoading: false,
  getRecentRooms: async (): Promise<void> => {
    set({ isRecentRoomsLoading: true });
    try {
      const response = await axiosInstance.get("/room/user/my/recent");
      // as we log out should rooms be turn back into an empty array
      set({ recentRooms: response.data });
    } catch (e) {
      toast.error("Something went wrong loading recent rooms.");
      console.error("Error in getting recent rooms", e);
    } finally {
      set({ isRecentRoomsLoading: false });
    }
  },

  isLeavingRoom: false,
  unsubscribeRoom: async (roomId: string, userId : string): Promise<void> => {
    set({ isLeavingRoom: true });
    const { recentRooms } = get();
    try {
      await axiosInstance.delete(`/room/${roomId}/collaborators/${userId}`);
      set({ recentRooms: recentRooms.filter(room => room.roomId !== roomId) });
      toast.success("Successfully unsubscribed from room!");
    } catch (e) {
      toast.error("Something went wrong in unsubscribing room!");
      console.error("Error in unsubscribing room", e);
    } finally {
      set({ isLeavingRoom: false });
    }
  },

  isEditingRoom: false,
  editRoom: async (data, id: string): Promise<void> => {
    set({ isEditingRoom: true });
    try {
      const response = await axiosInstance.put(`/room/${id}`, data);

      set({ currentRoom: response.data });

      toast.success("Successfully updated the room: " + response.data.roomName);
    } catch (e) {
      console.log("Error in editRoom: " + e);
      toast.error("Something went wrong.");
    } finally {
      set({ isEditingRoom: false });
    }
  },

  // setter
  setCurrentRoom: (room: Room) => set({ currentRoom: room }),

  collaborators: [],
  isGettingAllCollabs: false,
  getAllCollaborators: async () => {
    set({ isGettingAllCollabs: true });
    const { currentRoom } = get();
    try {
      const response = await axiosInstance.get(`/room/${currentRoom?.roomId}/collaborators`);

      set({ collaborators: response.data });
    } catch (e) {
      console.log("Error in getting all collabs: " + e);
      toast.error("Something went wrong.");
    } finally {
      set({ isGettingAllCollabs: false });
    }
  },

  isRemovingCollab: false,
  removeCollab: async (userId: string) => {
    set({ isRemovingCollab: true });
    const { currentRoom, getAllCollaborators } = get();
    try {
      await axiosInstance.delete(`/room/${currentRoom?.roomId}/collaborators/${userId}`);

      await getAllCollaborators();

      toast.success("Successfully removed the collaborator!");
    } catch (e) {
      console.log("Error in removing the collaborator: " + e);
      toast.error("Something went wrong.");
    } finally {
      set({ isRemovingCollab: false });
    }
  },

  createTemplateRoom: async (templateId: string) => {
    set({ isCreatingRoom: true })
    const { getRooms } = get();
    try {
      const response = await axiosInstance.post(`/room/create/from-template/${templateId}`);

      await getRooms();

      toast.success("Successfully created the room: " + response.data.room.roomName);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        if (error.response?.status === 403) {
          toast.error("Room limit reached (10 rooms max)");
        } else {
          toast.error("Something went wrong.");
          console.error("An error has occurred in createTemplateRoom", e);
        }
      } else {
        console.log("Error in createTemplateRoom: " + e);
        toast.error("Something went wrong.");
      }
    } finally {
      set({ isCreatingRoom: false });
    }
  },
}));