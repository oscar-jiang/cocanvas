import type { Socket } from "socket.io-client";
import type {User} from "./User.ts"

export type AuthStore = {
  // TODO: Add socket type
  socket: Socket | null,
  disconnectSocket(): unknown;
  connectSocket(): unknown;


  authUser: User | null,
  isSigningUp: boolean,
  isLoggedIn: boolean,
  isUpdatingProfile: boolean,

  isCheckingAuth: boolean,

  checkAuth: () => Promise<void>;

  signup: (data: User) => Promise<void>;

  logout: () => Promise<void>;

  login: (data: User) => Promise<void>;
}