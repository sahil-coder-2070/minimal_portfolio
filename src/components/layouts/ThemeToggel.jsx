import React from "react";
import { useTheme } from "../ui/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inset-shadow dark: cursor-pointer rounded-md px-2.5 py-2.5 duration-200 hover:bg-neutral-100 dark:inset-shadow-neutral-800/60 hover:dark:bg-neutral-900/60"
    >
      {!isDark ? <Sun size={16} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
