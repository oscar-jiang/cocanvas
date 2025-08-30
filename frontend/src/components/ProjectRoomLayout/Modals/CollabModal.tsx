import { useModalStore } from '../../../store/useModalStore.ts';
import { useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore.ts';
import { useRoomStore } from '../../../store/useRoomStore.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CollabModal = () => {
  const { isCollabModalOpen, closeCollabModal, openInviteModal } = useModalStore();
  const { authUser } = useAuthStore();
  const { currentRoom: room, isGettingAllCollabs, collaborators, getAllCollaborators, removeCollab, isRemovingCollab, unsubscribeRoom, isLeavingRoom } = useRoomStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCollabModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reset on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCollabModalOpen]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await getAllCollaborators();
      } catch (e) {
        console.error("Trouble getting all collabs", e);
      }
    };
    
    fetch();
  }, [getAllCollaborators]);

  const isOwner : boolean = authUser?.userId === room?.createdBy;

  if (!isCollabModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black w-full font-nunito">

      {/* Collaborators CONTAINER */}
      <div className={'relative font-nunito w-[377px] bg-white border-2 border-[#E5E5E5] rounded-3xl'}>
        {/* Absolute in the top right corner */}
        <div
          className={'absolute top-5 right-5 cursor-pointer text-[#7D7D7D]'}
          onClick={() => closeCollabModal()}
        >
          <X />
        </div>

        {/* BODY CONTAINER */}
        <div className={'flex flex-col items-center w-full h-full gap-6 p-6 bg-white rounded-2xl'}>
          {/* Title */}
          <h1 className={'font-black text-2xl text-[#4B4B4B]'}>
            Collaborators
          </h1>

          {/* MAIN COLLAB CONTAINER */}
          <div className="w-full">
            {isGettingAllCollabs ? (
              <div className="flex items-center justify-center">
                <Loader2 />
              </div>
            ) : collaborators.length === 0 ? (
              <p className="text-center text-gray-500">No collaborators yet.</p>
            ) : (
              <div className={'flex flex-col gap-4'}>
                <button
                  className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-full h-[40px] cursor-pointer'}
                  onClick={() => {
                    closeCollabModal();

                    if (!room) return toast.error("Unable to invite.");

                    openInviteModal(room);
                  }}
                >
                  <span className={'text-sm font-black text-[#7D7D7D]'}>Invite</span>
                </button>

                <ul className="flex flex-col gap-2">
                  {[...collaborators]
                    .sort((a, b) => (a.userId === room?.createdBy ? -1 : b.userId === room?.createdBy ? 1 : 0))
                    .map((collab) => (
                      <li
                        key={collab.userId}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                      >
                        {/* Left side: user info */}
                        <div className="flex flex-col">
                        <span className="font-medium text-gray-700">
                          {collab.username}
                          {collab.userId === room?.createdBy && (
                            <span className="ml-2 text-xs font-semibold text-blue-500">(Project Creator)</span>
                          )}
                          {collab.userId === authUser?.userId && (
                            <span className="ml-2 text-xs font-semibold text-green-500">(You)</span>
                          )}
                        </span>
                          <span className="text-sm text-gray-500">{collab.email}</span>
                        </div>

                        {/* Right side: actions */}
                        {isOwner && collab.userId !== authUser?.userId && (
                          <button
                            className="px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border border-[#D1D1D1] cursor-pointer"
                            onClick={() => removeCollab(collab?.userId ?? '')}
                            disabled={isRemovingCollab}
                          >
                            <span className="text-sm font-black text-[#7D7D7D]">Remove</span>
                          </button>
                        )}

                        {collab.userId === authUser?.userId && collab.userId !== room?.createdBy && (
                          <button
                            className="px-2 py-1 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border border-[#D1D1D1] cursor-pointer"
                            onClick={() => {
                              unsubscribeRoom(room?.roomId ?? '', authUser?.userId ?? '');
                              navigate(`/home`);
                            }}
                            disabled={isLeavingRoom}
                          >
                            {isLeavingRoom ? (
                              <Loader2 className={'size-[30px] text-[#7D7D7D]'} />
                            ) : (
                              <span className="text-sm font-black text-[#7D7D7D]">Leave</span>
                            )}
                          </button>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default CollabModal;
