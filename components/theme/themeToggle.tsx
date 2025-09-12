"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "next-themes";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const THEME_SYSTEM = "system";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();

  const [isLight, setIsLight] = useState<boolean>(true);

  const handleThemeChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        setIsLight(true);
        setTheme(THEME_LIGHT);
      } else {
        setIsLight(false);
        setTheme(THEME_DARK);
      }
    },
    [setTheme]
  );

  const initTheme = useCallback(() => {
    if (theme === THEME_SYSTEM) {
      if (systemTheme === THEME_LIGHT) setIsLight(true);
      else setIsLight(false);
    } else {
      if (theme === THEME_LIGHT) setIsLight(true);
      else setIsLight(false);
    }
  }, [systemTheme, theme]);

  useEffect(() => initTheme(), [initTheme]);

  return (
    <Toggle
      variant="outline"
      className="group cursor-pointer data-[state=on]:hover:bg-muted text-muted-foreground data-[state=on]:text-muted-foreground data-[state=on]:hover:text-foreground size-8 rounded-full border-none shadow-none data-[state=on]:bg-transparent"
      pressed={isLight}
      onPressedChange={handleThemeChange}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <SunIcon
        size={16}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <MoonIcon
        size={16}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}
