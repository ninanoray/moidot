"use client";

import { EdgeSwipePages } from "@/constants";
import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type SwipeContextType = {
  /**
   * 가장 자리 크기 값(px)
   * 값이 있으면 화면 가장 자리에서만 스와이프 동작
   */
  edge: number | undefined;
  setEdge: (size: number | undefined) => void;
};

const SwipeContext = React.createContext<SwipeContextType | undefined>(
  undefined
);

const useSwipe = (): SwipeContextType => {
  const context = React.useContext(SwipeContext);
  if (!context) {
    throw new Error("useSwipe must be used within an SwipeProvider");
  }
  return context;
};

type SwipeProviderProps = {
  asChild?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

const SwipeProvider = ({
  asChild,
  disabled,
  onSwipeLeft,
  onSwipeRight,
  children,
}: SwipeProviderProps) => {
  const [edge, setEdge] = useState<number>();
  if (disabled) return <>{children}</>;

  return (
    <SwipeContext.Provider value={{ edge, setEdge }}>
      <SwipeWrapper
        asChild={asChild}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      >
        {children}
      </SwipeWrapper>
    </SwipeContext.Provider>
  );
};

interface SwipeWrapperProps extends SwipeProviderProps {
  /**
   * 최소 스와이프 거리(px)
   */
  threshold?: number;
  className?: string | undefined;
}

const SwipeWrapper: React.FC<SwipeWrapperProps> = ({
  threshold = 70,
  onSwipeLeft = () => console.log("👈 Swipe Left"),
  onSwipeRight = () => console.log("👉 Swipe Right"),
  className,
  asChild,
  children,
}) => {
  const pathname = usePathname();
  const { edge, setEdge } = useSwipe();
  useEffect(() => {
    if (EdgeSwipePages.includes(pathname)) setEdge(50);
    else setEdge(undefined);
  }, [pathname, setEdge]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const allowSwipe = useRef<boolean>(true); // edgeOnly 체크용

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const x = e.targetTouches[0].clientX;
    touchStartX.current = x;

    if (edge) {
      const screenWidth = window.innerWidth;
      const isLeftEdge = x <= edge;
      const isRightEdge = x >= screenWidth - edge;
      allowSwipe.current = isLeftEdge || isRightEdge;
    } else allowSwipe.current = true;
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!allowSwipe.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function onTouchEnd() {
    if (
      !allowSwipe.current ||
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      resetTouch();
      return;
    }

    const delta = touchStartX.current - touchEndX.current;

    if (delta > threshold) {
      onSwipeLeft?.();
    } else if (delta < -threshold) {
      onSwipeRight?.();
    }
    resetTouch();
  }

  // 초기화
  function resetTouch() {
    touchStartX.current = null;
    touchEndX.current = null;
  }

  const Component = asChild ? Slot : "div";

  return (
    <Component
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={className}
    >
      {children}
    </Component>
  );
};

export { SwipeProvider, SwipeWrapper, useSwipe };
