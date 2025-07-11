import {create} from "zustand/react";
import {axiosInstance} from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type {RoomStore} from "../types/RoomStore.ts";
import {AxiosError} from "axios";
import axios from "axios";
import socket from "../lib/socket.ts";
import {useAuthStore} from "./useAuthStore.ts";

export const useRoomStore = create<RoomStore>((set, get) => ({
  currentRoom: null,
  isCreatingRoom: false,

  createRoom: async (data) => {
    set({isCreatingRoom: true});
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
      set({isCreatingRoom: false});
    }
  },

  rooms: [],
  isRoomsLoading: false,
  getRooms: async ():Promise<void> => {
    set({isCreatingRoom: true});
    try {
      const response = await axiosInstance.get("/room/user/my");
      // as we log out should rooms be turn back into an empty array
      set({rooms: response.data});
    } catch (e) {
      toast.error("Something went wrong. " + e);
    } finally {
      set({isCreatingRoom: false});
    }
  },

  isCheckingRoomAuth: true,
  checkRoomAuth: async (roomId: string) => {
    set({ isCheckingRoomAuth: true });
    try {
      const res = await axiosInstance.get(`/room/${roomId}`);
      set({ currentRoom: res.data });
      if(!socket.connected) {
        socket.connect();
      }
      socket.emit("joinRoom", roomId);
      console.log("Socket connected to room: ", roomId);
    } catch (e) {
      set({ currentRoom: null });
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
          toast.error("You are not authorized to access this room.");
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
  leavePageReset: () => {
    socket.emit("leaveRoom");
    set({
      currentRoom: null,
      rooms: [],
      recentRooms: [],
      isRoomsLoading: false,
      isCreatingRoom: false,
      isCheckingRoomAuth: true,
    });
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

  deleteRoom: async (id: string): Promise<void> => {
    console.log("id in deleteRoom zustand: ", id);
    try {
      await axiosInstance.delete(`/room/${id}`);
      toast.success("Successfully deleted!");
    } catch (e) {
      toast.error("Something went wrong.");
      console.error("Error in deleteRoom", e);
    }
  },

  joinRoom: () => {
    const authUser = useAuthStore.getState().authUser;
    const socket = useAuthStore.getState().socket;
    const currentRoom = get().currentRoom;
    if (!authUser || !socket || !currentRoom) { return; }

    const roomId: string = currentRoom.roomId;
    const userId: string | undefined = authUser.userId;

    socket.emit("joinRoom", {roomId, userId});
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
  getRecentRooms: async ():Promise<void> => {
    set({isRecentRoomsLoading: true});
    try {
      const response = await axiosInstance.get("/room/user/my/recent");
      // as we log out should rooms be turn back into an empty array
      set({recentRooms: response.data});
    } catch (e) {
      toast.error("Something went wrong loading recent rooms.");
      console.error("Error in getting recent rooms", e);
    } finally {
      set({isRecentRoomsLoading: false});
    }
  },
}));