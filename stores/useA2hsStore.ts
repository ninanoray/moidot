import { create } from "zustand";
import { persist } from "zustand/middleware";

type A2HSStore = {
  needA2HS: boolean; // 웹앱 설치 안내 출력 여부
  saveNeedA2HS: (show: boolean) => void;
};

export const useA2HSStore = create(
  persist<A2HSStore>(
    (set, get) => ({
      needA2HS: true,
      saveNeedA2HS: (show) => {
        set({ needA2HS: show });
      },
    }),
    {
      name: "A2HS",
    }
  )
);
