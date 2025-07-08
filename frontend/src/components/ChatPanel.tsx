import MessageList from "./MessageList.tsx";
import MessageInput from "./MessageInput.tsx";

const ChatPanel = () => {
  return (
    <div className="w-120 h-full flex flex-col p-4 bg-gray-800 rounded-xl shadow border-l border-gray-700">
      <h2 className="text-xl font-semibold mb-2">Chat</h2>

      <div className="flex-1 overflow-y-auto mb-2">
        <MessageList />
      </div>

      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatPanel;