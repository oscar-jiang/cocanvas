import {create} from "zustand/react";
import {axiosInstance} from "../lib/Axios.ts";
import type {AuthStore} from "../types/AuthStore.ts";
import type {User} from "../types/User.ts";
import toast from "react-hot-toast";
import {useRoomStore} from "./useRoomStore.ts";

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggedIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () :Promise<void> => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({authUser:response.data});
    } catch (e) {
      console.log("Error in checkAuth: " + e);
      set({authUser:null});
    } finally {
      set({isCheckingAuth: false });
    }
  },
  signup: async (data: User):Promise<void> => {
    set({isSigningUp: true});
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success("Signup successful!");
      set({authUser:response.data});
    } catch (e) {
      console.log("Error in signup: " + e);
      toast.error("Something went wrong.");
    } finally {
      set({isSigningUp: false});
    }
  },
  logout: async ():Promise<void> => {
    // we can add an isLoggingOut state if we want
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      useRoomStore.getState().logoutReset();
      toast.success("Logged out successfully");
    } catch (e) {
      console.log("Error in logout: " + e);
      toast.error("Something went wrong.");
    }
  },
  login: async (data : User):Promise<void> => {
    set({isSigningUp: true});
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({authUser: response.data});
      toast.success("Login successful!");
    } catch (e) {
      console.log("Error in login: " + e);
      toast.error("Invalid Credentials");
    } finally {
      set({isSigningUp: false});
    }
  }
}));