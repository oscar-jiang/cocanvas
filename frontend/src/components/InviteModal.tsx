const InviteModal = () => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="inviteModal" className="modal">
        <div className="modal-box flex flex-col items-center">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Invite Friends</legend>
            <h4>Send invitations to join Room : 123</h4>
            <label className="label">Email Address</label>
            <input type="email" className="input" placeholder="Email" />

            <label className="label">Personal Message (optional) </label>
            <textarea className="textarea" placeholder="Hi Friend! Join me in this awesome study room... " />
            <div className="modal-action">
                {/* make buttons have gaps */}
              <form method="dialog" className="flex w-full gap-2 justify-center">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-neutral mt-4">Cancel</button>
                <button className="btn btn-neutral mt-4" onClick={()=>{console.log("send invite to server")}}>Send Invite</button>
              </form>
            </div>
          </fieldset>
        </div>
      </dialog>
    </div>
  );
};

export default InviteModal;
