import { Plus } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore.ts';
import CreateRoomComponent from './CreateRoomComponent.tsx';

const CreateNewProjectCard = () => {
  const { isCreateRoomOpen, openCreateRoom } = useModalStore();

  return (
    <>
      <div className={'flex flex-col mt-2 items-center justify-start font-nunito'}>
        <div
          className="w-[191px] h-[245px] bg-white flex items-center justify-center border-2 rounded-xl border-[#E5E5E5] hover:scale-[1.02] transition-all cursor-pointer"
          onClick={openCreateRoom}
        >
          <Plus className="w-12 h-12 text-gray-400" />
        </div>

        <h2 className={'font-nunito mt-2 font-black text-[#4B4B4B] text-center'}>
          Create Project
        </h2>
      </div>
      {isCreateRoomOpen && <CreateRoomComponent />}
    </>
  );
};

export default CreateNewProjectCard;