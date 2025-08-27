import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useModalStore } from '../../store/useModalStore.ts';
import { useInboxStore } from '../../store/useInboxStore.ts';

const InviteModal = () => {
  const { closeInviteModal, selectedRoom } = useModalStore();
  const { sendInvite } = useInboxStore();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email || !email.includes('@')) {
      toast('Please enter a valid email.');
      return;
    }
    // add word limit to personal message
    const personalMessage = (e.target as HTMLFormElement).querySelector('textarea')?.value || '';
    if (personalMessage.length > 200) {
      toast.error('Personal message cannot exceed 200 characters.');
      return;
    }

    try {
      await sendInvite({
        receiverEmail: email,
        personalMessage,
        roomId: selectedRoom?.roomId || '',
        roomName: selectedRoom?.roomName || '',
      });
    } catch (e: Error | any) {
      console.error('Error sending invite: ', e);
      return;
    }
    closeInviteModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="modal modal-open" id="inviteModal">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="fieldset-legend">Invite Friends</label>
          <div className='flex gap-2'>
            <h4>Send invitations to Join</h4>
            <label className="badge badge-soft badge-primary"> Room : {selectedRoom?.roomName}</label>
          </div>

          <label className="label">Email Address</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label className="label">Personal Message (optional)</label>
          <textarea
            className="textarea"
            placeholder="Hi Friend! Join me in this awesome study room..."
          />

          <div className="flex w-full gap-2 justify-center mt-4">
            <button type="button" className="btn btn-neutral" onClick={closeInviteModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-neutral">
              Send Invite
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default InviteModal;
