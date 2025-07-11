import {FileText, LogOut, MessageCircle, Users} from "lucide-react";
import {useRoomStore} from "../../store/useRoomStore.ts";

const TopNavigation = () => {
  const { currentRoom } = useRoomStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-blue-500 rounded-full" />
        <h1 className="text-lg font-bold text-blue-500 truncate max-w-xs">Project: {currentRoom?.roomName}</h1>
      </div>
      <nav className="flex items-center gap-4 text-sm flex-wrap">
        <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition text-black">
          <FileText className="w-4 h-4" /> Document
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition text-black">
          <Users className="w-4 h-4" /> Collaborators
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition text-black">
          <MessageCircle className="w-4 h-4" /> Chat
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 font-bold rounded-full hover:bg-green-600 transition">
          <LogOut className="w-4 h-4" /> Leave
        </button>
      </nav>
    </header>
  );
};

export default TopNavigation;