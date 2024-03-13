import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../interfaces/auth.interface";
import { AuthService } from "../api/service/auth.service";

export interface AuthState {
  token?: string;
  user?: User;
  isAuth?: boolean;

  loginUser: (userName: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  token: undefined,
  user: undefined,
  isAuth: undefined,

  loginUser: async (userName: string, password: string) => {
    try {
      const { token, user } = await AuthService.login(userName, password);
      set({ token, user, isAuth: true });
    } catch (error) {
      set({ token: undefined, user: undefined, isAuth: undefined });
      throw "Unauthorized";
    }
  },

  logoutUser: () => {
    set({ token: undefined, user: undefined, isAuth: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, { name: "auth-storage", version: 1 })
);
