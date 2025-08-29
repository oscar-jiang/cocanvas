import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useRoomStore } from '../store/useRoomStore.ts';
import ProjectRoomLayout from '../components/ProjectRoomLayout/ProjectRoomLayout.tsx';
import { useChatStore } from '../store/useChatStore.ts';

const CollaborativeEditorPage = () => {
  const { roomId } = useParams();
  const {
    currentRoom,
    isCheckingRoomAuth,
    checkRoomAuth,
    leavePageReset,
    leaveRoom,
  } = useRoomStore();

  useEffect(() => {
    if (roomId) {
      checkRoomAuth(roomId);
    }

    // // when the user exits out of the page we reset the currentRoom
    return () => {
      leaveRoom();
      leavePageReset();
    }
  }, [roomId, checkRoomAuth, leavePageReset, leaveRoom]);

  // checking the room auth, loading instead
  if (isCheckingRoomAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/*<Loader className={"size-10 animate-spin"}/>*/}
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  // if we do not have a current room, this means that we are unauthorized
  if (!isCheckingRoomAuth && !currentRoom) {
    return <Navigate to="/unauthorized" replace />;
  }

  // if we have a currentRoom, we are authorized display the room
  if (currentRoom) {
    return (
      <div>
        <ProjectRoomLayout />
        {/*<RoomLayout />*/}
      </div>
    );
  }

  // default loader
  return (
    <div className="flex items-center justify-center h-screen">
      {/*<Loader className={"size-10 animate-spin"}/>*/}
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};


export default CollaborativeEditorPage;