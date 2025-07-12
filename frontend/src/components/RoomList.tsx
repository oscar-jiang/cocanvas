import { FileText } from 'lucide-react';
import { useRoomStore } from '../store/useRoomStore.ts';
import { useEffect } from 'react';
import type { Room } from '../types/Room.ts';
import { formatMonthDay } from '../lib/utils.ts';
import { useAuthStore } from '../store/useAuthStore.ts';
import { Link } from 'react-router-dom';
import InviteModal from './InviteModal.tsx';
import { useModalStore } from '../store/useModalStore.ts';

const RoomList = () => {
  const { isRecentRoomsLoading, recentRooms, getRecentRooms, unsubscribeRoom, deleteRoom } =
    useRoomStore();
  const { authUser } = useAuthStore();
  const { isInviteModalOpen } = useModalStore();

  useEffect(() => {
    getRecentRooms();
  }, [getRecentRooms]);

  if (isRecentRoomsLoading) {
    // TODO: create skeleton component
    return <div>Loading...</div>;
  }

  const handleInviteClick = (e: React.MouseEvent<HTMLButtonElement>, room: Room) => {
    e.preventDefault();
    e.stopPropagation();
    useModalStore.getState().openInviteModal(room);
  };

  const handleLeaveClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    room: Room,
    isOwner: boolean
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (isOwner) {
      await deleteRoom(room.roomId);
    } else {
      await unsubscribeRoom(room.roomId);
    }
  };

  return (
    <div className="p-6 text-gray-800">
      {isInviteModalOpen && <InviteModal />}
      <h2 className="text-3xl font-bold mb-4">Recents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentRooms.map((room: Room) => {
          const isOwner = authUser?.username?.trim().toLowerCase() === room.createdByUsername?.trim().toLowerCase();
          const displayName = isOwner ? 'You' : room.createdByUsername;
          return (
            <Link to={`/room/${room.roomId}`} className={'h-full no-underline'}>
              <div
                key={room.roomId}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:scale-[1.02] transition-all flex items-start gap-4 h-full"
              >
                <div className="bg-gray-100 p-2 rounded-full">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex flex-col justify-between flex-1 h-full gap-5">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{room.roomName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{room.description}</p>
                    <button className="btn btn-sm" onClick={(e) => handleInviteClick(e, room)}>
                      📧 Invite
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={(e) => handleLeaveClick(e, room, isOwner)}
                    >
                      {isOwner ? '🗑️ Delete' : '🚪 Leave'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last updated: {formatMonthDay(room.updatedAt)} • By: {displayName}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RoomList;
