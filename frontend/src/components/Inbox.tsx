import { useInboxStore } from '../store/useInboxStore';
const Inbox = () => {
  const { acceptInvitation, declineInvitation, getInbox } = useInboxStore();
  const inbox = useInboxStore((s) => s.inbox); 

  const handleAcceptClick = async (e: React.MouseEvent<HTMLButtonElement>, inviteId: string) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      await acceptInvitation(inviteId);
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
    <div className="absolute top-16 -right-30 z-50">
      <ul className="bg-base-100 rounded-box shadow-md max-w-sm w-96 p-2 space-y-2">
        <li className="px-4 pt-2 text-xs opacity-60 tracking-wide">Inbox</li>
        {inbox.length === 0 && (
          <li className="text-center text-sm opacity-70 py-4">
            No invitations yet. Invite your friends to collaborate!
          </li>
        )}

        {inbox.map((invitation) => {
          return (
            <li
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-base-200 transition"
              key={invitation.inviteId}
            >
              <img
                className="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                alt="profile"
              />

              <div className="flex-1">
                <div className="text-sm font-medium">{invitation.invitorUsername}</div>
                <div className="text-sm font-medium">{invitation.invitorEmail}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Invited you to join :
                </div>
                <div className="mt-1">
                  <span className="badge badge-soft badge-primary badge-sm">
                    {invitation.roomName}
                  </span>
                </div>
                <p className="text-xs mt-1 opacity-70">{invitation.personalMessage}</p>
              </div>

              {/* accept / decline buttons */}
              <div className="flex flex-col gap-1">
                <button
                  className="btn btn-xs btn-ghost text-success"
                  onClick={(e) => handleAcceptClick(e, invitation.inviteId || '')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </button>
                <button
                  className="btn btn-xs btn-ghost text-error"
                  onClick={(e) => handleDeclineClick(e, invitation.inviteId || '')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;
