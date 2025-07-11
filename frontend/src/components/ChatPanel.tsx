import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";

const ChatPanel = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 bg-white rounded-2xl shadow-md border border-gra-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Chat</h2>

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