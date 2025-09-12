"use client";

import { PULL_SENSITIVITY } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
  maxDistance: number;
  scrollPosition: number;
}

const PullToRefreshWrapper = ({
  children,
  onRefresh = () => window.location.reload(),
  maxDistance,
  scrollPosition,
}: PullToRefreshProps) => {
  const refreshRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);
  const [yDistance, setYDistance] = useState(0);

  // 초기화
  const resetToInitial = useCallback(() => {
    if (refreshRef.current) {
      refreshRef.current.style.height = "0";
      refreshRef.current.style.paddingTop = "0";
      refreshRef.current.style.willChange = "unset";
    }
    setPulled(false);
    setIsRefreshing(false);
  }, []);

  const ableBodyScroll = () => (document.body.style.overflow = "auto");
  const preventBodyScroll = () => (document.body.style.overflow = "hidden");

  // 당김 시작
  const onStart = useCallback((y: number, touch: boolean) => {
    setStartY(y);
    setIsTouch(touch);
    setPulled(true);
    if (refreshRef.current) {
      refreshRef.current.style.willChange = "height, paddingTop";
    }
  }, []);

  // 당김 중
  const onMove = useCallback(
    (y: number) => {
      if (pulled && refreshRef.current) {
        const moveY = y;
        const pulledDistance = Math.min(
          Math.pow(moveY - startY, PULL_SENSITIVITY),
          maxDistance
        );
        setYDistance(pulledDistance);

        if (pulledDistance > 0) {
          preventBodyScroll();
          refreshRef.current.style.height = `${pulledDistance}px`;
          // if (pulledDistance < maxDistance * 0.7) {
          //   // 절반은 여백 적용 없이 당겨짐(살짝만 당겨도 여백이 튀어나오는 문제)
          //   refreshRef.current.style.height = `${pulledDistance}px`;
          // } else {
          //   // 아이폰 여백 적용
          //   refreshRef.current.style.paddingTop = "env(safe-area-inset-top)";
          //   refreshRef.current.style.height = `calc(${pulledDistance}px + env(safe-area-inset-top))`;
          // }

          if (pulledDistance >= maxDistance) setIsRefreshing(true);
          else setIsRefreshing(false);
        } else {
          ableBodyScroll();
          resetToInitial();
        }
      }
    },
    [maxDistance, pulled, resetToInitial, startY]
  );

  // 당김 종료
  const onEnd = useCallback(async () => {
    if (pulled) {
      ableBodyScroll();
      if (isRefreshing) {
        try {
          onRefresh();
          await new Promise((resolve) => {
            setTimeout(resolve, 500); // 최대 1초까지 기다림
          });
          resetToInitial();
        } catch (error) {
          console.error("Error while refreshing:", error);
        }
      } else {
        resetToInitial();
        setYDistance(0);
      }
    }
  }, [isRefreshing, onRefresh, pulled, resetToInitial]);

  useEffect(() => {
    const touchMoveListener = (e: TouchEvent) => {
      if (isTouch && pulled) onMove(e.touches[0].clientY);
    };

    document.addEventListener("touchmove", touchMoveListener);
    return () => document.removeEventListener("touchmove", touchMoveListener);
  }, [isTouch, onMove, pulled]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) onStart(e.touches[0].clientY, true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouch && pulled) onMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (isTouch && pulled) onEnd();
  };

  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  } else {
    return (
      <div className="size-full">
        <div
          ref={refreshRef}
          className="sat h-0 bg-primary text-primary-foreground flex-center"
        >
          {isRefreshing ? (
            <Loader2 className="animate-rotate repeat-infinite" />
          ) : yDistance > maxDistance * 0.3 ? (
            "↓ 아래로 당겨서 새로 고침 ↓"
          ) : (
            ""
          )}
        </div>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="size-full flex flex-col"
        >
          {children}
        </div>
      </div>
    );
  }
};

export default PullToRefreshWrapper;
