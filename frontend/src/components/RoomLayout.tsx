import DocumentEditor from "./DocumentEditor";
import ChatPanel from "./ChatPanel";
import {useRoomStore} from "../store/useRoomStore.ts";

const RoomLayout = () => {
  const { currentRoom } = useRoomStore();

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-gray-950 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">{currentRoom.roomName}</h1>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <DocumentEditor />
        <ChatPanel />
      </main>
    </div>
  );
};

export default RoomLayout;