import React from "react";
import { useTheme } from "../ui/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      {!isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
