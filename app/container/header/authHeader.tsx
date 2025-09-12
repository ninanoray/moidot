"use client";

import {
  MotionHighlight,
  MotionHighlightItem,
} from "@/components/animate-ui/effects/motion-highlight";
import ThemeSwitch from "@/components/theme/themeSwitch";
import { Menu } from "@/constants/pageRoutes";
import { cn } from "@/lib/utils";
import { useLayoutContainer } from "../layoutContainerProvider";
import { NavUser } from "../navUser";
import Logo from "./logo";

const AuthHeader = () => {
  const { scrollY } = useLayoutContainer();

  return (
    <div className="px-3 flex justify-between items-center">
      <nav className="flex items-center gap-8">
        <Logo />
        <ol className="flex gap-4">
          <MotionHighlight
            hover
            controlledItems
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            className={cn(
              "border-b-1 bg-transparent",
              scrollY > 0 ? "border-primary-foreground" : "border-foreground/75"
            )}
          >
            {Menu[0].pages.map((page) => {
              return (
                <MotionHighlightItem key={page.title} className="group/menu">
                  <li
                    className={cn(
                      "w-18 opacity-75 group-hover/menu:opacity-100 transition-opacity duration-500",
                      scrollY > 0
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    <a href={page.url} className={cn("w-full p-2 flex-center")}>
                      {page.title}
                    </a>
                  </li>
                </MotionHighlightItem>
              );
            })}
          </MotionHighlight>
        </ol>
      </nav>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <NavUser />
      </div>
    </div>
  );
};

export default AuthHeader;
