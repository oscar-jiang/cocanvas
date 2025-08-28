import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useModalStore } from '../../store/useModalStore.ts';
import { useInboxStore } from '../../store/useInboxStore.ts';
import { Loader2, Mail, X } from 'lucide-react';

const InviteModal = () => {
  const { closeInviteModal, selectedRoom, isInviteModalOpen } = useModalStore();
  const { sendInvite, isCreatingInvite } = useInboxStore();

  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  useEffect(() => {
    if (isInviteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Reset on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInviteModalOpen]);

  const validateInviteForm = (): string | boolean => {
    const email = formData.email.trim().toLowerCase();
    const message = formData.message.trim();

    if (!email || email === '') {
      return toast.error('Email is required');
    }

    if (email.length > 300) {
      return toast.error('Email is too long');
    }

    if (message.length > 200) {
      return toast.error('Message is too long (150 characters)');
    }

    if (!email.includes('@')) {
      return toast('Please enter a valid email.');
    }

    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const isValid: string | boolean = validateInviteForm();

    if (isValid === true) {
      try {
        await sendInvite({
          receiverEmail: formData.email,
          personalMessage: formData.message,
          roomId: selectedRoom?.roomId || '',
          roomName: selectedRoom?.roomName || '',
        });
      } catch (e) {
        toast.error('Error sending invite')
        console.error('Error sending invite: ', e);
        return;
      } finally {
        closeInviteModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black w-full">

      {/* INVITE FORM CONTAINER */}
      <div className={'relative font-nunito w-[377px] h-[493px] bg-white border-2 border-[#E5E5E5] rounded-3xl'} id="inviteModal">
        {/* Absolute in the top right corner */}
        <div
          className={'absolute top-5 right-5 cursor-pointer text-[#7D7D7D]'}
          onClick={() => closeInviteModal()}
        >
          <X />
        </div>

        {/* BODY CONTAINER */}
        <div className={'flex flex-col items-center w-full h-full gap-6 p-6 bg-white rounded-2xl'}>
          {/* Title */}
          <h1 className={'font-black text-2xl text-[#4B4B4B]'}>
            Invite Collaborators
          </h1>

          {/* Room Information */}
          <div className={'flex flex-col items-center justify-center space-y-2'}>
            <h2 className={'font-black text-[#7D7D7D]'}>
              Sending an invitation to join room:
            </h2>

            {/* Room Name (truncate the text if the room name is too long) */}
            <div className={'w-[302px] h-[38px] bg-[#E5E5E5] flex items-center justify-center rounded-md'}>
              <span className={'font-bold text-[#7D7D7D]'}>
                Testing Room Name
              </span>
            </div>
          </div>

          {/* Form Main Container */}
          <div className={'flex flex-col items-center w-full max-w-md mx-auto gap-6'}>
            <form onSubmit={handleSubmit} className={'flex flex-col w-full gap-4'}>
              {/* Email Address Container */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Email Address</label>
                <input
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder="Enter Email"
                  type={"email"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Personal Message to the user */}
              <div className={'flex flex-col w-full'}>
                <label className={'font-black text-[#7D7D7D] mb-1'}>Message (Optional)</label>
                <textarea
                  className={'p-2 border-2 border-[#D8D8D8] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#C8C8C8] bg-[#F7F7F7] min-h-[72px] max-h-[100px] placeholder:font-nunito placeholder:font-bold placeholder-[#D9D9D9]'}
                  placeholder={'Enter Message (Optional)'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Send Invite Button */}
              <div className={'flex items-center justify-center'}>
                <button
                  className={'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-[188px] h-[40px] cursor-pointer'}
                  type="submit"
                  disabled={isCreatingInvite}
                >
                  {isCreatingInvite ? (
                    <>
                      <Loader2 className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-sm font-black text-[#7D7D7D]'}>Creating...</span>
                    </>
                    ) : (
                    <>
                      <Mail className={'size-[20px] text-[#7D7D7D] mr-3'} />
                      <span className={'text-sm font-black text-[#7D7D7D]'}>Send Invite</span>
                    </>
                  )}
                </button>
              </div>
            </form>


          </div>
        </div>


      </div>
      {/* INVITE FORM CONTAINER end */}


    </div>
  );
};

export default InviteModal;
