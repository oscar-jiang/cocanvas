import type { Invitation } from "./Invitation";


export type InboxStore = {

  inbox: Invitation[];
  isCreatingInvite: boolean;
  isAcceptingOrDecliningInvite: boolean;
  isGettingInbox: boolean;

  getInbox: (userId: string) => Promise<void>;
  sendInvite: (invitationData: Invitation) => Promise<void>;
  acceptInvitation: (inviteId: string) => Promise<void>;
  declineInvitation: (inviteId: string) => Promise<void>;

}