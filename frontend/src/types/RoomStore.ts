import type {Room} from "./Room.ts";
import type { User } from './User.ts';

export interface RoomStore {
  currentRoom: Room | null,

  createRoom: (data : {roomName: string; description: string }) => Promise<void>;
  isCreatingRoom: boolean;

  rooms: Room[];
  isRoomsLoading: boolean;
  getRooms: () => Promise<void>;

  isCheckingRoomAuth: boolean;
  checkRoomAuth: (roomId: string) => Promise<void>;

  leavePageReset: () => void;
  logoutReset: () => void;

  isDeletingRoom: boolean;
  deleteRoom: (id: string) => Promise<void>;

  joinRoom: () => void;
  leaveRoom: () => void;

  recentRooms: Room[];
  isRecentRoomsLoading: boolean;
  getRecentRooms: () => Promise<void>;

  isLeavingRoom: boolean;
  unsubscribeRoom: (roomId: string, userId: string) => Promise<void>;

  isEditingRoom: boolean;
  editRoom: (data: {roomName: string, description: string, roomIcon: string}, id: string) => Promise<void>;

  setCurrentRoom: (room: Room) => void;

  collaborators: User[];
  isGettingAllCollabs: boolean;
  getAllCollaborators: () => Promise<void>;

  isRemovingCollab: boolean;
  removeCollab: (userId: string) => Promise<void>;
}