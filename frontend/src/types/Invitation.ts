export interface Invitation {
  personalMessage: string;
  roomId: string;
  roomName: string;
  inviteId?: string;
  invitorId?: string;
  invitorEmail?: string;
  invitorUsername?: string;
  receiverEmail?: string;
  receiverUsername?: string;
  receiverId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}