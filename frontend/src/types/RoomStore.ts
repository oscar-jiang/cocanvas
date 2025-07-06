import type {Room} from "./Room.ts";

export interface RoomStore {
  createRoom: (data : {roomName: string; description: string }) => Promise<void>;
  isCreatingRoom: boolean;

  rooms: Room[];
  isRoomsLoading: false;
  getRooms: () => Promise<void>;
}