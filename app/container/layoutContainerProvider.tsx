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
  disableHeadernFooter: boolean;
};

const LayoutContainerProvider = ({
  children,
  className,
  session,
  disableHeadernFooter: disabled,
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
          {!disabled && !!!session && <Header session={session} />}
          <main className={cn("flex-1", className)}>{children}</main>
          {!!session && <Footer />}
        </div>
      </div>
    </LayoutContainerContext.Provider>
  );
};

export default LayoutContainerProvider;
