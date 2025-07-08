import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: any | undefined;
  saveUser: (user: any) => void;
  auth: any;
  login: (res: any) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: undefined,
      saveUser: (user) => {
        set({ user });
      },
      auth: "",
      login: (res) => {
        set({ auth: res });
      },
      logout: () => {
        set({ user: undefined, auth: undefined });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
