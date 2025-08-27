import {useEffect } from "react";
import { ChevronsUpDown } from 'lucide-react';
import {useRoomStore} from "../store/useRoomStore.ts";
import CreateNewProjectCard from '../components/ProjectCard/CreateNewProjectCard.tsx';
import TemplateProjectCard from '../components/ProjectCard/TemplateProjectCard.tsx';
import ProjectCard from '../components/ProjectCard/ProjectCard.tsx';

const DashboardPage = () => {
  // const [formData, setFormData] = useState({
  //   roomName: "",
  //   description: "",
  // });

  const { rooms, isRoomsLoading, getRooms } = useRoomStore();

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  if (isRoomsLoading) {return <div>Loading...</div>}

  // const validateRoomCreation  = (): string | boolean => {
  //
  //   const name = formData.roomName.trim();
  //   const nameLength = formData.roomName.length;
  //   const descriptionLength = formData.description.length;
  //
  //   if (!name || name === "") {
  //     return toast.error("Room name is required");
  //   }
  //
  //   if (nameLength > 100) {
  //     return toast.error("Room name is too long");
  //   }
  //
  //   if (descriptionLength > 150) {
  //     return toast.error("Description is too long");
  //   }
  //
  //   return true;
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   const isValid : string | boolean = validateRoomCreation();
  //   if (isValid === true) {
  //     try {
  //       await createRoom(formData);
  //       setFormData({
  //         roomName: "",
  //         description: "",
  //       });
  //       getRooms();
  //     } catch (e) {
  //       console.error("Room creation failed", e);
  //       toast.error("Room creation failed");
  //     }
  //   }
  // };

  // const handleDeleteButton = async (roomId: string) => {
  //   try {
  //     await deleteRoom(roomId);
  //     getRooms();
  //   } catch (e) {
  //     console.error("Room deletion failed", e);
  //     toast.error("Room deletion failed");
  //   }
  // };

  return (
    <div>
      {/*--- THIS WILL BE THE MAIN HOMEPAGE LAYOUT ---*/}
      <div className={'flex justify-center h-full bg-white'}>

        {/*TEMPLATES & RECENT PROJECTS SECTION*/}
        <div className={'w-full max-w-[1006px] h-[442px] px-6 py-8 space-y-8 mx-auto'}>

          {/*Templates Section*/}
          <div className={'space-y-8'}>
            <h2 className={'font-nunito font-black text-gray-500 text-xl mb-4'}>Templates</h2>

            <div className={'bg-[#F6F6F6] rounded-3xl border-2 border-[#E5E5E5] p-10 relative'}>
              <h2 className={'font-nunito font-black text-gray-500 text-xl'}>Start a New Project</h2>

              <ChevronsUpDown className={'w-5 h-5 text-gray-400 absolute top-10 right-10 cursor-pointer'} strokeWidth={3.5} />

              {/* This is where the create project button is and where you can make other templates. */}
              <div className={'flex flex-wrap justify-start space-x-6 mt-6'}>
                {/*Create a new project*/}
                <CreateNewProjectCard />

                {/* Display three templates */}
                <TemplateProjectCard />
                <TemplateProjectCard />
                <TemplateProjectCard />
              </div>

            </div>
          </div>

          {/*Recent Projects Section*/}
          <div className={'relative border-2 border-[#E5E5E5] space-y-4 rounded-3xl'}>
            <div className={'p-10'}>
              <h2 className={'font-nunito font-black text-gray-500 text-xl'}>Recent Projects</h2>

              <div className={'absolute top-10 right-10 flex justify-between space-x-4'}>
                <ChevronsUpDown className={'w-5 h-5 text-gray-400 cursor-pointer'} strokeWidth={3.5} />
                <ChevronsUpDown className={'w-5 h-5 text-gray-400 cursor-pointer'} strokeWidth={3.5} />
              </div>


              {/* Recent Project Cards Row */}
              <div className={'flex flex-wrap gap-12 mt-10'}>
                {rooms.map((room) => (
                  <ProjectCard key={room.roomId} room={room} />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      {/*--- HOMEPAGE ---*/}
    </div>
  );
};

export default DashboardPage;