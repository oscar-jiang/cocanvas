import { LogOut, Star, UserRoundPlus, UsersRound, Trash } from 'lucide-react';
import type { Room } from '../../types/Room.ts';
import React from 'react';
import { formatYear } from '../../lib/utils.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../store/useModalStore.ts';
import { useRoomStore } from '../../store/useRoomStore.ts';
import toast from 'react-hot-toast';

interface ProjectCardProps {
  room: Room;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ room }) => {
  const { deleteRoom, unsubscribeRoom, getRooms } = useRoomStore();
  const { authUser } = useAuthStore();
  const { openInviteModal } = useModalStore();

  const navigate = useNavigate();

  const handleClickToProject = () => {
    navigate(`/p/${room.roomId}`);
  };

  const handleInviteClick = (e: React.MouseEvent<HTMLButtonElement>, room: Room) => {
    e.preventDefault();
    e.stopPropagation();
    openInviteModal(room);
  };

  const handleLeaveClick = async (e: React.MouseEvent<HTMLButtonElement>, room: Room, isOwner: boolean): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (isOwner) {
      try {
        await deleteRoom(room.roomId);
        await getRooms();
      } catch (e) {
        toast.error('Error occurred while deleting room.');
        console.error(e);
      }
    } else {
      try {
        await unsubscribeRoom(room.roomId, authUser?.userId ?? '');
        await getRooms();
      } catch (e) {
        toast.error('Error occurred while leaving room.');
        console.error(e);
      }
    }
  };

  const isOwner = authUser?.userId === room.createdBy;
  const displayName = isOwner ? 'You' : room.createdByUsername;


  return (
    <div onClick={handleClickToProject} className={'relative w-[259px] h-[322px] bg-white border-2 rounded-xl border-[#E5E5E5] overflow-hidden m-0 p-0 font-nunito hover:scale-[1.02] transition-all cursor-pointer'}>
      {/* Top bar */}
      <div className={'absolute top-0 w-[270px] h-[80px] bg-[#E5E5E5] p-0'}></div>

      {/* Project Icon */}
      <div className={'absolute left-1/5 top-[76px] -translate-x-1/2 -translate-y-1/2 text-4xl p-0'}>
        {room.roomIcon ? room.roomIcon : '🚀'}
      </div>

      {/* Action Buttons */}
      <div className={'absolute top-[83px] right-4 flex space-x-3'}>
        {/*  */}
        <div className={'p-1 rounded hover:bg-gray-200 cursor-pointer transition-all'}>
          <Star className={'size-5'} />
        </div>
        {/* Invite people */}
        <div
          className={'p-1 rounded hover:bg-gray-200 cursor-pointer transition-all'}
          onClick={(e) => handleInviteClick(e, room)}
        >
          <UserRoundPlus className={'size-5'} />
        </div>
        {/* leave the room (if not the owner of the room) or delete the room (if IS the owner of the room) */}
        <div
          className={'p-1 rounded hover:bg-gray-200 cursor-pointer transition-all'}
          onClick={(e) => handleLeaveClick(e, room, isOwner)}
        >
          {isOwner ? (<Trash className={'size-5'}/>) : (<LogOut className={'size-5'} />)}
        </div>
      </div>

      {/* Body Container */}
      <div className={'flex flex-col justify-between h-full mt-22'}>
        {/* Body Content */}
        <div className={'flex-1 px-4 py-2 text-left'}>
          {/* Title */}
          <h2 className={'font-nunito font-black text-lg mt-2 p-0 leading-tight line-clamp-2'}>
            {room.roomName}
          </h2>

          {/* Description */}
          <p className={'font-nunito text-xs font-bold text-gray-600 m-0 p-0 line-clamp-6'}>
            {room.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={'absolute bottom-0 w-full px-4 py-2 text-xs text-gray-600 m-0 p-0'}>
        {/* Users Active */}
        <div className={'flex items-center space-x-1 mb-2 gap-4 p-0'}>
          <UsersRound className={'size-5'}/>
          <span className={'font-semibold'}>0/10</span>
        </div>

        {/* Information */}
        <div>
          <p className={'font-bold'}>Created By: {displayName}</p>
          <p className={'font-bold'}>Last Updated: {formatYear(room.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;