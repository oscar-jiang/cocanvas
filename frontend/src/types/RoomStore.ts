import type {Room} from "./Room.ts";

export interface RoomStore {
  currentRoom: Room | null,

  createRoom: (data : {roomName: string; description: string }) => Promise<void>;
  isCreatingRoom: boolean;

  rooms: Room[];
  isRoomsLoading: false;
  getRooms: () => Promise<void>;

  isCheckingRoomAuth: boolean;
  checkRoomAuth: (roomId: string) => Promise<void>;

  leavePageReset: () => void;
  logoutReset: () => void;

  deleteRoom: (id: string) => Promise<void>;

  joinRoom: () => void;
  leaveRoom: () => void;

  recentRooms: Room[];
  isRecentRoomsLoading: boolean;
  getRecentRooms: () => Promise<void>;

  unsubscribeRoom: (roomId: string) => Promise<void>;
}