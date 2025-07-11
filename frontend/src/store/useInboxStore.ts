
import {create} from "zustand/react";
import {axiosInstance} from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type {InboxStore} from "../types/InboxStore.ts";
import type {Invitation} from "../types/Invitation.ts";



export const useInboxStore = create<InboxStore>((set, get) => ({
  inbox: [],

  getInbox: async (userId: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/inbox/getInbox/${userId}`);
      set({ inbox: response.data });
      console.log("Inbox fetched successfully: ", get().inbox);
    } catch (e) {
      toast.error("Error getting messages");
      console.log("Error getting messages: ", e);
    }
  },
  sendInvite: async (invitationData : Invitation) => {
    try {
      const response = await axiosInstance.post("/inbox/sendInvite", invitationData);
      const { inbox } = get();
      set({ inbox: [...inbox, response.data] });

    } catch (e : Error | any) {
      toast.error("Error sending invite");
      console.error("Error sending invite: ", e.response.data.error);
    }
  }}))