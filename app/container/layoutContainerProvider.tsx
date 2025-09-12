"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Header from "./header";

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

  return (
    <LayoutContainerContext.Provider value={contextValue}>
      <div
        ref={ref}
        onScroll={() => updateScroll()}
        className="mscreen flex overflow-y-auto"
      >
        <div className="relative flex-1 flex flex-col" {...props}>
          {!pathname.startsWith("/login") && (
            <Header
              session={session}
              className={!session ? "" : "hidden md:block"}
            />
          )}
          <main
            className={cn(
              "flex-1 md:pb-0",
              !!session ? "pb-13" : "",
              className
            )}
          >
            {children}
          </main>
          {!!session && <Footer className="md:hidden" />}
        </div>
      </div>
    </LayoutContainerContext.Provider>
  );
};

export default LayoutContainerProvider;
