import {create} from "zustand/react";
import {axiosInstance} from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type {RoomStore} from "../types/RoomStore.ts";


export const useRoomStore = create<RoomStore>((set) => ({
  isCreatingRoom: false,

  createRoom: async (data) => {
    set({isCreatingRoom: true});
    try {
      const response = await axiosInstance.post("/room/create", data);
      toast.success("Successfully created the room: " + response.data.roomName);
    } catch (e) {
      console.log("Error in createRoom: " + e);
      toast.error("Something went wrong.");
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
      set({rooms: response.data});
    } catch (e) {
      toast.error("Something went wrong. " + e);
    } finally {
      set({isCreatingRoom: false});
    }
  }
}));