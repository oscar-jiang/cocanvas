export interface Message {
  messageId: string;
  roomId: string;
  senderId?: {
    userId: string;
    fullName: string;
    username: string;
    email: string;
  };
  text?: string;
  image?: string;
  seenBy?: string[];
  createdAt: string;
}