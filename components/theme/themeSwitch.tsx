"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "../animate-ui/radix/switch";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const THEME_SYSTEM = "system";

export default function ThemeSwitch({ className }: { className?: string }) {
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
    <Switch
      id="theme-switch"
      checked={isLight}
      onCheckedChange={handleThemeChange}
      thumbIcon={isLight ? <Sun /> : <Moon />}
      className={cn("w-10 data-[state=checked]:bg-secondary", className)}
    />
  );
}
