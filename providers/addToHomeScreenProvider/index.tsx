"use client";

import { usePersistStore } from "@/hooks/usePersistStore";
import { useA2HSStore } from "@/stores/useA2hsStore";
import { BeforeInstallPromptEvent } from "@/types/BeforeInstallPromptEvent";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AddToHomeScreenContext = {
  needInstall: boolean | undefined;
  deferredPrompt: BeforeInstallPromptEvent | null;
  installWebApp: () => void;
  clearPrompt: () => void;
};

const AddToHomeScreenContext = createContext<AddToHomeScreenContext | null>(
  null
);

const AddToHomeScreenProvider = ({ children }: { children: ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const isToast = usePersistStore(useA2HSStore, (state) => state.needA2HS); //전역 상태로 "다시 보지 않기" 상태 확인
  const isWebApp =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches;
  const needInstall = isToast && !isWebApp;

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    if (needInstall) window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [needInstall]);

  const contextValue = useMemo(() => {
    const clearPrompt = () => setDeferredPrompt(null);

    const installWebApp = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => clearPrompt());
      } else alert("이미 설치하셨습니다.");
    };

    return {
      needInstall: needInstall,
      deferredPrompt: deferredPrompt,
      installWebApp: installWebApp,
      clearPrompt: clearPrompt,
    };
  }, [deferredPrompt, needInstall]);

  return (
    <AddToHomeScreenContext.Provider value={contextValue}>
      {children}
    </AddToHomeScreenContext.Provider>
  );
};

export default AddToHomeScreenProvider;

export function useA2HS() {
  const context = useContext(AddToHomeScreenContext);

  if (!context) {
    throw new Error("useA2HS must be used within a AddToHomeScreenProvider.");
  }
  return context;
}

// 기능 지원이 가능한 브라우저인지 확인
export const checkUnsupportedBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    (userAgent.indexOf("safari") > -1 &&
      userAgent.indexOf("chrome") <= -1 &&
      userAgent.indexOf("chromium") <= -1) ||
    (userAgent.indexOf("firefox") > -1 && userAgent.indexOf("seamonkey") <= -1)
  );
};
