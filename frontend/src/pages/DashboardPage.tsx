import React, {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import toast from "react-hot-toast";
import {useRoomStore} from "../store/useRoomStore.ts";

const DashboardPage = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
  });

  const {createRoom, isCreatingRoom, rooms, isRoomsLoading, getRooms } = useRoomStore();

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  if (isRoomsLoading) {return <div>Loading...</div>}

  const validateRoomCreation  = (): string | boolean => {

    const name = formData.roomName.trim();

    if (!name || name === "") {
      return toast.error("Full name is required");
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid : string | boolean = validateRoomCreation();
    if (isValid === true) {
      try {
        await createRoom(formData);
        setFormData({
          roomName: "",
          description: "",
        });
      } catch (e) {
        console.error("Room creation failed", e);
        toast.error("Room creation failed");
      }
    }
  };


  return (
    <div>
      DashboardPage

      <div className={""}>
        <h1>Create Room</h1>

        {/* The form & login is what is important */}
        <form onSubmit={handleSubmit} className={"space-y-6 "}>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Room Name</legend>
            <input type="text" className="input w-full" placeholder="Room Name"
                   value={formData.roomName}
                   onChange={(e) => setFormData({...formData, roomName: e.target.value})}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Room Description</legend>
            <input type="text" className="input w-full" placeholder="Description"
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </fieldset>

          <button type={"submit"} className={"btn btn-primary w-full"} disabled={isCreatingRoom}>
            {
              isCreatingRoom ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Room"
              )
            }
          </button>
        </form>
      </div>

      <div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">My Rooms</h2>

          {!isRoomsLoading && rooms.length === 0 && (
            <p className="text-gray-500">You are not in any rooms yet.</p>
          )}

          <ul className="space-y-2">
            {rooms.map((room) => (
              <li key={room._id} className="p-4 rounded-lg border bg-gray-800 shadow-sm">
                <h3 className="text-lg font-semibold">{room.roomName}</h3>
                <p className="text-sm text-gray-200">{room.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;