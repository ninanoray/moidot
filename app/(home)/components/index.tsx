"use client";

import { useCallback, useEffect, useState } from "react";
import PublicHomeHeader from "./public/header";
import PublicHomeMain from "./public/main";

const Public = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll 위치를 감지
  const updateScroll = useCallback(() => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [updateScroll]);

  return (
    <div className="bg-layout p-0">
      <PublicHomeHeader scroll={scrollPosition} />
      <PublicHomeMain scroll={scrollPosition} />
    </div>
  );
};

export default Public;
