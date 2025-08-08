"use client";

import { Slot } from "@radix-ui/react-slot";
import React, { useRef } from "react";

interface SwipeWrapperProps {
  /**
   * 최소 스와이프 거리(px)
   */
  threshold?: number;
  /**
   * 가장 자리 크기 값(px)
   * 값이 있으면 화면 가장 자리에서만 스와이프 동작
   */
  edge?: number;
  className?: string | undefined;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  asChild?: boolean;
  children: React.ReactNode;
}

const SwipeWrapper: React.FC<SwipeWrapperProps> = ({
  threshold = 70,
  edge = 50,
  onSwipeLeft = () => console.log("👈 Swipe Left"),
  onSwipeRight = () => console.log("👉 Swipe Right"),
  className,
  asChild,
  children,
}) => {
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
    } else {
      allowSwipe.current = true;
    }
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
      // 초기화
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

export default SwipeWrapper;
