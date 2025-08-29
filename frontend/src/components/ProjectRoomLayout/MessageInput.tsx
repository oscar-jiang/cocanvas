import React, { useState } from 'react';
import { useChatStore } from '../../store/useChatStore.ts';
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
      <div className={'flex items-center w-full gap-2'}>
        <input
          type="text"
          className="flex-1 px-4 py-2 border-3 border-[#E5E5E5] rounded-2xl bg-white text-gray-800 placeholder:font-nunito placeholder:text-[#E5E5E5] placeholder:font-bold"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className={'size-10 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out disabled:opacity-50 border-2 border-[#D1D1D1] focus:outline-none'}
          disabled={!text.trim()}
        >
          <Send className={'size-7 text-[#7D7D7D]'} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
