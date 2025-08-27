import { useModalStore } from '../../store/useModalStore.ts';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRoomStore } from '../../store/useRoomStore.ts';

const CreateRoomComponent = () => {
  const { isCreateRoomOpen, closeCreateRoom } = useModalStore();
  const { createRoom, isCreatingRoom, getRooms } = useRoomStore();
  const [formData, setFormData] = useState({
    roomName: '',
    description: '',
  });

  useEffect(() => {
    if (isCreateRoomOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reset on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCreateRoomOpen]);

  const validateRoomCreation = (): string | boolean => {
    // Prevent background scroll when modal is open

    const name = formData.roomName.trim();
    const nameLength = formData.roomName.length;
    const descriptionLength = formData.description.length;

    if (!name || name === '') {
      return toast.error('Room name is required');
    }

    if (nameLength > 100) {
      return toast.error('Room name is too long');
    }

    if (descriptionLength > 150) {
      return toast.error('Description is too long');
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: string | boolean = validateRoomCreation();
    if (isValid === true) {
      try {
        await createRoom(formData);
        setFormData({
          roomName: '',
          description: '',
        });

        // Close the modal
        closeCreateRoom();

        // Refresh the rooms list
        getRooms();

      } catch (e) {
        console.error('Room creation failed', e);
        toast.error('Room creation failed');
      }
    }
  };

  if (!isCreateRoomOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black w-full">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Room</h2>

        {/* The form & login is what is important */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Enter room name"
              value={formData.roomName}
              onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              placeholder="Optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={closeCreateRoom}
              className="px-4 py-2 rounded bg-gray-200 text-sm font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white bg-[#78c800] hover:bg-[#66aa00] px-6 py-2 rounded font-semibold text-sm"
              disabled={isCreatingRoom}
            >
              {isCreatingRoom ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Room'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomComponent;
