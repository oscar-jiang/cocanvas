import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore.ts';
import { Send } from 'lucide-react';

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();

    // If it is empty we don't do anything
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      // Clear form
      setText('');
    } catch (e) {
      console.error('Failed to send message: ', e);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        disabled={!text.trim()}
      >
        <Send size={16} className="text-white" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
};

export default MessageInput;
