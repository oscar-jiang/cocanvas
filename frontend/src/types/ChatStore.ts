import type {Message} from "./Message.ts";
import type {MessageInput} from "../types/MessageInput.ts";

export type ChatStore = {
  
  messages: Message[];
  isMessagesLoading: boolean;

  getMessages: (roomId: string) => Promise<void>;
  sendMessage: (messageData:MessageInput) => Promise<void>;
  addMessage : (msg: Message) => Promise<void>;
}