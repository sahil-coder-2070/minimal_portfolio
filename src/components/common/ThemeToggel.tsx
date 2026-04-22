import React, { useEffect, useRef, useCallback } from "react";
import { useTheme } from "../landing/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const audioRef = useRef(null);

  const isDark = (resolvedTheme ?? theme) === "dark";

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0.02;
    audioRef.current.play().catch(() => {});
  };

  const toggleTheme = useCallback(() => {
    playSound();
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.repeat) return;
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable)
        return;
      if (e.key.toLowerCase() === "d") toggleTheme();
    },
    [toggleTheme],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <audio ref={audioRef} src="/sound.wav" preload="auto" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="cursor-pointer "
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={18} /> : <Sun size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className={"text-sm"}>Toggle theme (D)</TooltipContent>
      </Tooltip>
    </>
  );
};

export default ThemeToggle;
