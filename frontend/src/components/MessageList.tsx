import {useChatStore} from "../store/useChatStore.ts";
import {useEffect} from "react";
import {useRoomStore} from "../store/useRoomStore.ts";
import type {Message} from "../types/Message.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import {formatMessageTime} from "../lib/utils.ts";

const MessageList = () => {
  const { messages, getMessages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const { currentRoom } = useRoomStore();

  useEffect(() => {
    if (currentRoom) {
      getMessages(currentRoom.roomId);
    }
  }, [currentRoom, getMessages]);

  if (isMessagesLoading) {
    // This should really be a skeleton component
    return (
      <div>
        Loading...
      </div>
    );
  }

  // @ts-ignore
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {
        messages.map((message: Message) => (
          <div
            key={message.messageId}
            className={`
            chat
            ${message.senderId._id === authUser._id ? "chat-end" : "chat-start"}
            `}
          >
          {/* Can add the user avatar here */}
            <div className={"chat-header mb-1"}>
              <time className={"text-xs opacity-50 ml-1"}>
                {formatMessageTime(message.createdAt)}
              </time>
              <span className={"text-xs opacity-50 ml-1"}>
                {/* this should not be authUser, should be sender */}
                {message.senderId._id === authUser._id ? authUser.fullName : message.senderId.fullName}
              </span>
            </div>
            <div className={"chat-bubble flex"}>
              {/* This is where you add an image if the user has sent and image */}
              <p>{message.text}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default MessageList;