import { FileText } from "lucide-react";
import {useRoomStore} from "../store/useRoomStore.ts";
import {useEffect} from "react";
import type {Room} from "../types/Room.ts";
import {formatMonthDay} from "../lib/utils.ts";
import {useAuthStore} from "../store/useAuthStore.ts";
import {Link} from "react-router-dom";

const RoomList = () => {
  const { isRecentRoomsLoading, recentRooms, getRecentRooms } = useRoomStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getRecentRooms()
  }, [getRecentRooms]);

  if (isRecentRoomsLoading) {
    // TODO: create skeleton component
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-4">Recents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentRooms.map((room: Room) => (
          <Link to={`/room/${room.roomId}`} className={"h-full no-underline"} >
            <div
              key={room.roomId}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:scale-[1.02] transition-all flex items-start gap-4 h-full"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col justify-between flex-1 h-full">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{room.roomName}</h3>
                  <p className="text-sm text-gray-500 mb-2">{room.description}</p>
                </div>
                <p className="text-xs text-gray-500">
                  Last updated: {formatMonthDay(room.updatedAt)} • By:{" "}
                  {authUser?.username?.trim().toLowerCase() === room.createdByUsername?.trim().toLowerCase() ? "You" : room.createdByUsername}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomList;