import { useModalStore } from '../../../store/useModalStore.ts';
import React, { useEffect, useState } from 'react';
import { Loader2, PencilLine, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { emojiCategories } from '../../../lib/utils.ts';
import { useRoomStore } from '../../../store/useRoomStore.ts';

const EditRoomComponent = () => {
  const { isEditRoomOpen, closeEditRoom } = useModalStore();
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
    roomIcon: '',
  });
  const { currentRoom, editRoom, isEditingRoom } = useRoomStore();

  useEffect(() => {
    if (currentRoom) {
      setFormData({
        roomName: currentRoom.roomName || '',
        description: currentRoom.description || '',
        roomIcon: currentRoom.roomIcon || '',
      });
    }
  }, [currentRoom]);

  useEffect(() => {
    if (isEditRoomOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reset on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditRoomOpen]);

  const validateRoomEdit = (): string | boolean => {
    // Prevent background scroll when modal is open

    const name = formData.roomName.trim();
    const nameLength = formData.roomName.length;
    const descriptionLength = formData.description.length;

    if (!name || name === '') {
      return toast.error('Project name is required');
    }

    if (nameLength > 100) {
      return toast.error('Project name is too long');
    }

    if (descriptionLength > 150) {
      return toast.error('Description is too long');
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: string | boolean = validateRoomEdit();
    if (isValid === true) {
      try {
        await editRoom(formData, currentRoom?.roomId ?? '');

        // Close the modal
        closeEditRoom();
      } catch (e) {
        console.error('Project edit failed', e);
        toast.error('Project edit failed');
      }
    }
  };

  if (!isEditRoomOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black w-full">

      {/* CREATE ROOM FORM CONTAINER */}
      <div className={'relative font-nunito w-[377px] bg-white border-2 border-[#E5E5E5] rounded-3xl'} id="inviteModal">
        {/* Absolute in the top right corner */}
        <div
          className={'absolute top-5 right-5 cursor-pointer text-[#7D7D7D]'}
          onClick={() => closeEditRoom()}
        >
          <X />
        </div>

        {/* BODY CONTAINER */}
        <div className={'flex flex-col items-center w-full h-full gap-6 p-6 bg-white rounded-2xl'}>
          {/* Title */}
          <h1 className={'font-black text-2xl text-[#4B4B4B]'}>
            Edit Project Details
          </h1>

          {/* Form Main Container */}
          <div className={'flex flex-col items-center w-full max-w-md mx-auto gap-6'}>
            <form onSubmit={handleSubmit} className={'flex flex-col w-full gap-4'}>
              {/* Project Icon */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Project Icon</label>
                <div className="max-h-60 overflow-y-auto p-2 border-2 border-[#D8D8D8] rounded-xl bg-[#F7F7F7] space-y-4">
                  {emojiCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                      {/* Category label */}
                      <h3 className="text-xs font-semibold text-[#7D7D7D] mb-1">{category.label}</h3>

                      {/* Emoji grid */}
                      <div className="grid grid-cols-6 gap-2">
                        {category.emojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`text-2xl p-1 rounded hover:bg-gray-200 transition-all ${
                              formData.roomIcon === emoji ? "bg-gray-300" : ""
                            }`}
                            onClick={() => setFormData({ ...formData, roomIcon: emoji })}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Address Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Project Name</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter Project Name"
                  type={"text"}
                  value={formData.roomName}
                  onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  required
                />
              </div>

              {/* Project Description */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Description (Optional)</label>
                <textarea
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] min-h-[72px] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder={'Enter Description (Optional)'}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Send Invite Button */}
              <div className={'flex items-center justify-center'}>
                <button
                  className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-[188px] h-[40px] cursor-pointer'}
                  type="submit"
                  disabled={isEditingRoom}
                >
                  {isEditingRoom ? (
                    <>
                      <Loader2 className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-sm font-black text-[#7D7D7D]'}>Updating...</span>
                    </>
                  ) : (
                    <>
                      <PencilLine className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-sm font-black text-[#7D7D7D]'}>Update Project</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default EditRoomComponent;
