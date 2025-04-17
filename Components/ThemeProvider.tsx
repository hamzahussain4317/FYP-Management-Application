"use client";
import { useAppWrapper } from "@/context/AppDataContext";
import { useEffect } from "react";
interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useAppWrapper();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="
          fixed top-4 right-4
          bg-light-primary dark:bg-dark-background
          text-light-text  dark:text-dark-text
          px-4 py-2 rounded shadow-md z-50
          transition
        "
      >
        Use {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      {children}
    </>
  );
}
