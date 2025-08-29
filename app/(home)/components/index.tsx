"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PublicHomeHeader from "./public/header";
import PublicHomeMain from "./public/main";

const Public = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll 위치를 감지
  const updateScroll = useCallback(() => {
    if (ref.current) setScrollPosition(ref.current.scrollTop);
  }, []);

  useEffect(() => {
    updateScroll();
    // window.addEventListener("scroll", updateScroll);
    // return () => {
    //   window.removeEventListener("scroll", updateScroll);
    // };
  }, [updateScroll]);

  return (
    <div
      ref={ref}
      onScroll={() => updateScroll()}
      className="flex-1 flex flex-col overflow-y-auto"
    >
      <PublicHomeHeader scroll={scrollPosition} />
      <PublicHomeMain scroll={scrollPosition} />
    </div>
  );
};

export default Public;
