export interface Message {
  messageId: string;
  roomId: string;
  senderId: {
    _id: string;
    fullName: string;
    email: string;
  };
  text?: string;
  image?: string;
  seenBy?: string[];
  createdAt: string;
}