import MessageList from './MessageList.tsx';
import MessageInput from './MessageInput.tsx';

const ChatPanel = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-2xl font-nunito">
      <div className="-mx-4 px-4 border-b-2 border-[#D8D8D8] mb-4">
        <h2 className="text-xl font-bold text-[#7D7D7D] text-center mb-4">Project Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        <MessageList />
      </div>


      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatPanel;
