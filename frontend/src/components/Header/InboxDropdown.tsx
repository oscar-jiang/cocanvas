import { useInboxStore } from '../../store/useInboxStore.ts';
import { truncateText } from '../../lib/utils.ts';
import { useRoomStore } from '../../store/useRoomStore.ts'

const InboxDropdown = () => {
  const { acceptInvitation, declineInvitation, isAcceptingOrDecliningInvite, isGettingInbox } = useInboxStore();
  const inbox = useInboxStore((s) => s.inbox);
  const { getRooms } = useRoomStore();

  const handleAcceptClick = async (e: React.MouseEvent<HTMLButtonElement>, inviteId: string) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      await acceptInvitation(inviteId);
      await getRooms();
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };
  const handleDeclineClick = async (e: React.MouseEvent<HTMLButtonElement>, inviteId: string) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      await declineInvitation(inviteId);
    } catch (error) {
      console.error('Error declining invitation:', error);
    }
  };

  return (
    <div className="absolute top-16 right-15 flex flex-col w-[285px] h-[425px] bg-white border-2 border-[#E5E5E5] rounded-3xl shadow-md z-100">
      {/* Top */}
      <div className="border-b-2 border-[#D8D8D8] mb-4 w-full">
        <h2 className="text-xl font-black text-[#7D7D7D] text-center mt-4 mb-4">
          Inbox
          ({inbox.length})
        </h2>
      </div>

      {/* Middle */}
      <div className={'flex-1 overflow-y-auto'}>
        <div className={'flex flex-col gap-4 max-h-[280px]'}>
          {isGettingInbox ? (
            <div className="flex justify-center items-center w-full h-full text-gray-500">
              Loading inbox...
            </div>
          ) : (
            inbox.map((invitation) => (
              <div className={'border-b-2 border-[#E5E5E5]'} key={invitation.inviteId}>
                {/* --- INVITE CARD --- */}
                <div className={'w-full p-4 bg-white'}>
                  {/* Top (User Information & Room Information) */}
                  <div className={'flex gap-4 mb-4'}>
                    {/* Left (Icon & Name) */}
                    <div className={'flex flex-col items-center gap-2'}>
                      <div>
                        <div className={'w-11 h-11 bg-[#E5E5E5] rounded-full'}></div>
                      </div>
                      <div>
                  <span className={'font-black text-[#4B4B4B] text-xs line-clamp-1'}>
                    {truncateText(invitation.invitorUsername ?? '', 10)}
                  </span>
                      </div>
                    </div>

                    {/* Right (Sender Email, invited you to join and room name) */}
                    <div className={'flex flex-col justify-center gap-0'}>
                      <div>
                  <span className={'font-bold text-[#7D7D7D] text-sm line-clamp-1'}>
                    {truncateText(invitation.invitorEmail ?? '', 20)}
                  </span>
                      </div>
                      <div>
                  <span className={'font-bold text-[#C8C8C8] text-xs line-clamp-1'}>
                    Invited you to join:
                  </span>
                      </div>
                      <div>
                        <div className={'bg-[#E5E5E5] p-2 rounded-lg'}>
                    <span className={'font-bold text-[#7D7D7D] text-sm line-clamp-1'}>
                      {truncateText(invitation.roomName, 30)}
                    </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accept & Decline Buttons */}
                  <div className={'flex items-center gap-3 justify-center'}>
                    {/* Accept Button */}
                    <div className={'flex flex-col gap-3'}>
                      <button
                        className={
                          'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-[110px] h-[32px]'
                        }
                        onClick={(e) => handleAcceptClick(e, invitation.inviteId || '')}
                        disabled={isAcceptingOrDecliningInvite}
                      >
                  <span className={'text-sm font-black text-[#7D7D7D]'}>
                    {isAcceptingOrDecliningInvite ? 'Accepting' : 'Accept'}
                  </span>
                      </button>
                    </div>

                    {/* Decline Button */}
                    <div className={'flex flex-col gap-3'}>
                      <button
                        className={
                          'px-6 py-3 bg-[#F7F7F7] flex items-center justify-center rounded-xl shadow-[0_6px_0_#D1D1D1] active:shadow-[0_2px_0_#D1D1D1] active:translate-y-1 transition-all duration-150 ease-out border-1 border-[#D1D1D1] w-[110px] h-[32px]'
                        }
                        onClick={(e) => handleDeclineClick(e, invitation.inviteId || '')}
                        disabled={isAcceptingOrDecliningInvite}
                      >
                  <span className={'text-sm font-black text-[#7D7D7D]'}>
                    {isAcceptingOrDecliningInvite ? 'Declining' : 'Decline'}
                  </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* --- INVITE CARD --- */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxDropdown;
