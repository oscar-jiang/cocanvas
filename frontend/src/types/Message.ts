export interface Message {
  messageId: string;
  roomId: string;
  senderId?: string;
  text?: string;
  image?: string;
  seenBy?: string[];
  createdAt: string;
  sender?: {
    username: string;
    email: string;
    fullName: string;
    userId: string;
  };
}