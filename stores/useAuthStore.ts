import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: any | undefined;
  saveUser: (user: any) => void;
  isLogin: boolean;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: undefined,
      isLogin: false,
      saveUser: (user) => {
        set({ user, isLogin: true });
      },
      logout: () => {
        // postLogout().then(() => {
        //   set({ user: undefined, isLogin: false });
        //   window.location.replace("/" + "/login");
        // });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
