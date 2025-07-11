import React, {useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import toast from "react-hot-toast";
import {useRoomStore} from "../store/useRoomStore.ts";
import {Link} from "react-router-dom";
import RoomList from "../components/RoomList.tsx";
import Sidebar from "../components/Sidebar.tsx";
import CreateRoomComponent from "../components/CreateRoomComponent.tsx";

const DashboardPage = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
  });

  const {createRoom, isCreatingRoom, rooms, isRoomsLoading, getRooms, deleteRoom } = useRoomStore();

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  if (isRoomsLoading) {return <div>Loading...</div>}

  const validateRoomCreation  = (): string | boolean => {

    const name = formData.roomName.trim();
    const nameLength = formData.roomName.length;
    const descriptionLength = formData.description.length;

    if (!name || name === "") {
      return toast.error("Room name is required");
    }

    if (nameLength > 100) {
      return toast.error("Room name is too long");
    }

    if (descriptionLength > 150) {
      return toast.error("Description is too long");
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
        getRooms();
      } catch (e) {
        console.error("Room creation failed", e);
        toast.error("Room creation failed");
      }
    }
  };

  const handleDeleteButton = async (roomId: string) => {
    try {
      await deleteRoom(roomId);
      getRooms();
    } catch (e) {
      console.error("Room deletion failed", e);
      toast.error("Room deletion failed");
    }
  };

 

  return (
    <>
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <CreateRoomComponent />
        <div className="flex-1 flex flex-col">
          <main className="overflow-y-auto flex-1">
            <div className="max-w-[1450px] w-full mx-auto px-4 py-6">
              <RoomList />
            </div>
          </main>
        </div>
      </div>


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
                <li key={room.roomId} className="p-4 rounded-lg border bg-gray-800 shadow-sm">
                  <h3 className="text-lg font-semibold">{room.roomName}</h3>
                  <p className="text-sm text-gray-200">{room.description}</p>
                  <div className={"flex flex-row gap-4"}>
                    <Link to={"/room/"+room.roomId} className={"btn btn-primary"}>
                      <span>Join Room</span>
                    </Link>
                    <button className={"btn btn-primary"} onClick={() => handleDeleteButton(room.roomId)}>
                      <span>Delete Room</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>

  );
};

export default DashboardPage;