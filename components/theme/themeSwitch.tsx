"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "../animate-ui/radix/switch";
import { Label } from "../ui/label";

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
    <div className={cn("@container flex", className)}>
      <Switch
        id="theme-switch"
        checked={isLight}
        onCheckedChange={handleThemeChange}
        thumbIcon={isLight ? <Sun /> : <Moon />}
        className="w-fit mx-auto @[50px]:w-10 @[50px]:mx-0 shrink-1 data-[state=checked]:bg-secondary"
      />
      <Label
        htmlFor="theme-switch"
        className="w-0 @[50px]:w-auto @[50px]:mx-1.5 text-xs font-normal whitespace-nowrap overflow-hidden cursor-pointer trans-200"
      >
        {isLight ? "라이트 모드" : "다크 모드"}
      </Label>
    </div>
  );
}
