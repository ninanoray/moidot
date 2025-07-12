"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { RippleButton } from "../animate-ui/buttons/ripple";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const THEME_SYSTEM = "system";

export default function ThemeSwitch({ className }: { className?: string }) {
  const { systemTheme, theme, setTheme } = useTheme();

  const [Icon, setIcon] = useState<LucideIcon>(Sun);

  const initTheme = useCallback(() => {
    if (theme === THEME_SYSTEM) {
      if (systemTheme === THEME_LIGHT) setIcon(Sun);
      else setIcon(Moon);
    } else {
      if (theme === THEME_LIGHT) setIcon(Sun);
      else setIcon(Moon);
    }
  }, [systemTheme, theme]);

  const handleThemeChange = useCallback(() => {
    if (Icon === Sun) setTheme(THEME_DARK);
    else setTheme(THEME_LIGHT);
  }, [Icon, setTheme]);

  useEffect(() => initTheme(), [initTheme]);

  return (
    <RippleButton
      variant="secondary"
      size="icon"
      onClick={handleThemeChange}
      className={cn("size-8 rounded-2xl shrink-0", className)}
    >
      <Icon />
    </RippleButton>
  );
}
