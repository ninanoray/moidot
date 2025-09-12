"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import PullToRefreshWrapper from "./pullToRefreshWrapper";

type LayoutContainerContextProps = {
  scrollY: number;
};

const LayoutContainerContext =
  React.createContext<LayoutContainerContextProps | null>(null);

export function useLayoutContainer() {
  const context = React.useContext(LayoutContainerContext);
  if (!context) {
    throw new Error(
      "useLayoutContainer must be used within a LayoutContainer."
    );
  }

  return context;
}

type LayoutContainerProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  session: Session | null;
  pathname: string;
};

/*
 * 로그인 화면에서는 푸터 헤더 없음
 * pc 환경에서는 푸터 없고 헤더만
 * 모바일 화면에서는 헤더 없고 푸터만
 * 단 로그인하지 않은 모바일 메인 화면에서는 푸터 없이 헤더만
 */
const LayoutContainerProvider = ({
  children,
  className,
  session,
  pathname,
  ...props
}: LayoutContainerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll 위치를 감지
  const updateScroll = useCallback(() => {
    if (ref.current) setScrollPosition(ref.current.scrollTop);
  }, []);

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  const contextValue = React.useMemo<LayoutContainerContextProps>(
    () => ({
      scrollY: scrollPosition,
    }),
    [scrollPosition]
  );

  const isLogin = React.useMemo(() => !!session, [session]);
  const isLoginPage = React.useMemo(
    () => pathname.startsWith("/login"),
    [pathname]
  );

  return (
    <LayoutContainerContext.Provider value={contextValue}>
      <div
        ref={ref}
        onScroll={() => updateScroll()}
        className="mscreen flex overflow-y-auto"
      >
        <PullToRefreshWrapper scrollPosition={scrollPosition} maxDistance={60}>
          <div
            className={cn(
              "relative flex-1 flex flex-col"
              // isLogin ? "sat" : ""
            )}
            {...props}
          >
            {!isLoginPage && (
              <Header
                session={session}
                className={isLogin ? "hidden md:block" : ""}
              />
            )}
            <main
              className={cn(
                "flex-1 md:pb-0",
                isLogin ? "pb-13" : "",
                className
              )}
            >
              {children}
            </main>
            {isLogin && <Footer className="md:hidden" />}
          </div>
        </PullToRefreshWrapper>
      </div>
    </LayoutContainerContext.Provider>
  );
};

export default LayoutContainerProvider;
