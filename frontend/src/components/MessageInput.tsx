import React, {useState} from "react";
import {useChatStore} from "../store/useChatStore.ts";
import {Send} from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();

  const handleSendMessage =  async (evt: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    evt.preventDefault();

    // If it is empty we don't do anything
    if (!text.trim()) return;

    try {
      await sendMessage(
        {
          text: text.trim(),
        }
      );

      // Clear form
      setText('');
    } catch (e) {
      console.error("Failed to send message: ", e);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
      <input
        type="text"
        className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        placeholder="Type your message..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        className="btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        type="submit"
        disabled={!text.trim()}
      >
        <Send size={15} /> Send
      </button>
    </form>
  );
};

export default MessageInput;