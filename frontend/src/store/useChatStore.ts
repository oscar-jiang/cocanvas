import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/Axios.ts";
import {useRoomStore} from "./useRoomStore.ts";
import type {ChatStore} from "../types/ChatStore.ts";
import type {MessageInput} from "../types/MessageInput.ts";

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],

  isMessagesLoading: false,

  getMessages: async (roomId: string) : Promise<void> => {
    set({ isMessagesLoading: true });
    try {
     const response = await axiosInstance.get(`/message/${roomId}/getMessages`);
     set({ messages: response.data });
    } catch (e) {
      toast.error("Error getting messages");
      console.log("Error getting messages: ", e);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData:MessageInput):Promise<void> => {
    try {
      const { messages } = get();
      const currentRoom = useRoomStore.getState().currentRoom;
      if (!currentRoom) {
        throw new Error("Current room is empty");
      }
      const response = await axiosInstance.post(`/message/send/${currentRoom.roomId}`, messageData);
      set({ messages: [...messages, response.data] });
    } catch (e) {
      toast.error("Error sending messages");
      console.log("Error sending messages: ", e);
    }
  }
}));