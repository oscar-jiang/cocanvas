import React from 'react';
import type { TemplateRoom } from '../../types/TemplateRoom.ts';
import { useRoomStore } from '../../store/useRoomStore.ts';

interface TemplateProjectCardProps {
  templateRoom: TemplateRoom
}

const TemplateProjectCard: React.FC<TemplateProjectCardProps> = ({ templateRoom } ) => {
  const { createTemplateRoom, isCreatingRoom } = useRoomStore();

  return (
    <div className={'flex flex-col mt-2 items-center justify-start font-nunito'}>
      <div
        className={'relative w-[191px] h-[245px] bg-white flex items-center justify-center border-2 rounded-xl border-[#E5E5E5] overflow-hidden m-0 p-0 hover:scale-[1.02] transition-all cursor-pointer'}
        onClick={() => createTemplateRoom(templateRoom.templateRoomId ?? '')}
        aria-disabled={isCreatingRoom}
      >
        {/* Top bar */}
        <div className={'absolute top-0 w-[200px] h-[67px] bg-[#E5E5E5] rounded-t-xl p-0'}></div>

        {/* Project Icon */}
        <div className={'absolute left-1/5 top-[67px] -translate-x-1/2 -translate-y-1/2 text-4xl p-0'}>
          {templateRoom.roomIcon}
        </div>

        {/* Template Description */}
        <div className={'text-left w-[152px] max-w-[152px] h-[110px] max-h-[110px] mt-10'}>
          <h2 className={'font-nunito font-black text-lg mt-2 p-0 line-clamp-1'}>
            {templateRoom.roomName}
          </h2>
          <p className={'font-nunito text-xs font-bold text-gray-600 m-0 p-0 line-clamp-6'}>
            {templateRoom.description}
          </p>
        </div>
      </div>

      <h2 className={'font-nunito mt-2 font-black text-[#7D7D7D] text-center'}>
        Template Project
      </h2>
    </div>
  );
};

export default TemplateProjectCard;