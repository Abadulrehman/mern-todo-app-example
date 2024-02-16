import { useEffect, useState } from "react";
import { Toggle } from "./toggle";
import { LuMoon, LuSun } from "react-icons/lu";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dark");
    if (saved === "true") {
      setIsDark(true);
      document.body.classList.add("dark");
    } else if (saved === "false") {
      setIsDark(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDark = () => {
    if (isDark) {
      setIsDark(false);
      document.body.classList.remove("dark");
      localStorage.setItem("dark", "false");
    } else {
      setIsDark(true);
      document.body.classList.add("dark");
      localStorage.setItem("dark", "true");
    }
  };

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={toggleDark}
      aria-label="Dark mode toggle"
    >
      {isDark ? <LuSun /> : <LuMoon />}
    </Toggle>
  );
};
