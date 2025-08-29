
import { create } from "zustand/react";
import { axiosInstance } from "../lib/Axios.ts";
import toast from "react-hot-toast";
import type { InboxStore } from "../types/InboxStore.ts";
import type { Invitation } from "../types/Invitation.ts";
import { useAuthStore } from './useAuthStore.ts';

export const useInboxStore = create<InboxStore>((set, get) => ({
  inbox: [],
  isCreatingInvite: false,
  isAcceptingOrDecliningInvite: false,
  isGettingInbox: false,

  getInbox: async (userId: string): Promise<void> => {
    set({ isGettingInbox: true });
    try {
      const response = await axiosInstance.get(`/inbox/getInbox/${userId}`);
      set({ inbox: response.data });
      console.log("InboxDropdown fetched successfully: ", get().inbox);
    } catch (e) {
      toast.error("Error getting messages");
    } finally {
      set({ isGettingInbox: false });
    }
  },
  sendInvite: async (invitationData: Invitation) => {
    set({ isCreatingInvite: true });
    try {
      const response = await axiosInstance.post("/inbox/sendInvite", invitationData);
      const { inbox } = get();
      set({ inbox: [...inbox, response.data] });
      toast.success(`Invite sent to ${invitationData.receiverEmail}`);
    } catch (e: Error | any) {
      toast.error("Failed to send invite. " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isCreatingInvite: false });
    }
  },
  acceptInvitation: async (inviteId: string) => {
    set({ isAcceptingOrDecliningInvite: true });
    try {
      await axiosInstance.post(`/inbox/acceptInvitation/${inviteId}`);
      const { inbox } = get();
      set({ inbox: inbox.filter(invitation => invitation.inviteId !== inviteId) });
      toast.success("Invitation accepted successfully");
      console.log("inbox state", inbox);
    } catch (e: Error | any) {
      toast.error("Failed to accept invitation. " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isAcceptingOrDecliningInvite: false });
    }
  },
  declineInvitation: async (inviteId: string) => {
    set({ isAcceptingOrDecliningInvite: true });
    try {
      await axiosInstance.post(`/inbox/declineInvitation/${inviteId}`);
      toast.success("Invitation Declined successfully");
      const { inbox } = get();
      set({ inbox: inbox.filter(invitation => invitation.inviteId !== inviteId) });
    } catch (e: Error | any) {
      toast.error("Failed to decline invitation. " + e.response?.data?.error || "Unknown error");
    } finally {
      set({ isAcceptingOrDecliningInvite: false });
    }
  },

  subscribeInbox: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) { return; }

    socket.off("incomingInvite"); // prevent duplicate listeners
    socket.on("incomingInvite", (invite: Invitation) => {
      const { inbox } = get();
      set({ inbox: [...inbox, invite] });
      toast.success(`New invite from ${invite.invitorEmail}`);
    })
  }
}))