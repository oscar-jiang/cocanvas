
import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { InboxStore } from "../types/InboxStore.ts";
import type { Invitation } from "../types/Invitation.ts";



export const useInboxStore = create<InboxStore>((set, get) => ({
  inbox: [],

  getInbox: async (userId: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/inbox/getInbox/${userId}`);
      set({ inbox: response.data });
      console.log("InboxDropdown fetched successfully: ", get().inbox);
    } catch (e) {
      toast.error("Error getting messages");
    }
  },
  sendInvite: async (invitationData: Invitation) => {
    try {
      const response = await axiosInstance.post("/inbox/sendInvite", invitationData);
      const { inbox } = get();
      set({ inbox: [...inbox, response.data] });
      toast.success(`Invite sent to ${invitationData.receiverEmail}`);
    } catch (e: Error | any) {
      toast.error("Failed to send invite. " + e.response?.data?.error || "Unknown error");
    }
  },
  acceptInvitation: async (inviteId: string) => {
    try {
      await axiosInstance.post(`/inbox/acceptInvitation/${inviteId}`);
      const { inbox } = get();
      set({ inbox: inbox.filter(invitation => invitation.inviteId !== inviteId) });
      toast.success("Invitation accepted successfully");
      console.log("inbox state", inbox);
    } catch (e: Error | any) {
      toast.error("Failed to accept invitation. " + e.response?.data?.error || "Unknown error");
    }
  },
  declineInvitation: async (inviteId: string) => {
    try {
      await axiosInstance.post(`/inbox/acceptInvitation/${inviteId}`);
      toast.success("Invitation Declined successfully");
      const { inbox } = get();
      set({ inbox: inbox.filter(invitation => invitation.inviteId !== inviteId) });
    } catch (e: Error | any) {
      toast.error("Failed to accept invitation. " + e.response?.data?.error || "Unknown error");
    }
  }
}))