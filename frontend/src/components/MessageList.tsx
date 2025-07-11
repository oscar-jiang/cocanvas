import {useChatStore} from "../store/useChatStore.ts";
import {useEffect, useRef} from "react";
import {useRoomStore} from "../store/useRoomStore.ts";
import type {Message} from "../types/Message.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import {formatMessageTime} from "../lib/utils.ts";

const MessageList = () => {
  const { messages, getMessages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const { currentRoom } = useRoomStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRoom) {
      getMessages(currentRoom.roomId);
    }
  }, [currentRoom, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [messages]);

  if (isMessagesLoading) {
    // This should really be a skeleton component
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
      {messages.map((message: Message) => {
        const isMe = message.senderId === authUser.userId;

        return (
          <div
            key={message.messageId}
            className={`flex flex-col max-w-xs md:max-w-sm ${
              isMe ? "ml-auto items-end" : "items-start"
            }`}
            ref={messageEndRef}
          >
            <div className="text-xs text-gray-400 mb-1 flex gap-1 items-center">
              {
                isMe ? (
                  <>
                    <span>{formatMessageTime(message.createdAt)}</span>
                    <span>•</span>
                    <span>{authUser.username}</span>
                  </>
                ):(
                  <>
                    <span>{message.sender.username}</span>
                    <span>•</span>
                    <span>{formatMessageTime(message.createdAt)}</span>
                  </>
                )
              }
            </div>

            <div
              className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap break-words shadow ${
                isMe
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;